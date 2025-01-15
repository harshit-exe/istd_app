'use client'

import { useCallback, useMemo } from 'react'
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
  Panel,
} from 'reactflow'
import 'reactflow/dist/style.css'
import CustomNode from './CustomNode'
import { ArrowDownCircle, ArrowRightCircle, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import dagre from 'dagre'

const nodeTypes = {
  customNode: CustomNode,
}

const minimapStyle = {
  height: 120,
}

const flowStyles = {
  background: 'rgb(243, 244, 246)',
}

const getLayoutedElements = (nodes, edges, direction = 'TB') => {
  if (!nodes || nodes.length === 0) return { nodes: [], edges: [] };

  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  const nodeWidth = 320;
  const nodeHeight = 200;

  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ 
    rankdir: direction,
    nodesep: 80,
    ranksep: 100,
    marginx: 50,
    marginy: 50,
  });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    return {
      ...node,
      targetPosition: isHorizontal ? 'left' : 'top',
      sourcePosition: isHorizontal ? 'right' : 'bottom',
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    };
  });

  return { nodes: layoutedNodes, edges };
};

export default function RoadmapVisualization({ roadmapData }) {
  const initialNodes = useMemo(() => {
    if (!roadmapData || !Array.isArray(roadmapData)) {
      console.error('Invalid roadmapData:', roadmapData);
      return [];
    }
    return roadmapData.map((item, index) => ({
      id: `node-${index}`,
      type: 'customNode',
      data: { 
        label: item.title,
        subtopics: item.subtopics || [],
        resources: item.resources || []
      },
      position: { x: 0, y: index * 250 },
    }));
  }, [roadmapData]);

  const initialEdges = useMemo(() => {
    const edges = [];
    for (let i = 0; i < roadmapData.length - 1; i++) {
      edges.push({
        id: `edge-${i}-${i + 1}`,
        source: `node-${i}`,
        target: `node-${i + 1}`,
        type: 'smoothstep',
        animated: true,
        style: { stroke: '#6366f1' },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: '#6366f1',
        },
      });

      // Add some cross-connections for complexity
      if (i < roadmapData.length - 2) {
        edges.push({
          id: `edge-${i}-${i + 2}`,
          source: `node-${i}`,
          target: `node-${i + 2}`,
          type: 'default',
          animated: false,
          style: { stroke: '#9333ea', strokeDasharray: '5,5' },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: '#9333ea',
          },
        });
      }
    }
    return edges;
  }, [roadmapData]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const downloadRoadmapAsPDF = useCallback(() => {
    const flowWrapper = document.querySelector('.react-flow');
    if (flowWrapper) {
      html2canvas(flowWrapper, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'px',
          format: [canvas.width / 2, canvas.height / 2]
        });
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2);
        pdf.save('roadmap.pdf');
      });
    }
  }, []);

  const onLayout = useCallback(
    (direction) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
        nodes,
        edges,
        direction
      );
      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges, setNodes, setEdges]
  );

  if (!roadmapData || roadmapData.length === 0) {
    return <div className="text-center text-xl mt-8">No roadmap data available. Please generate a roadmap first.</div>;
  }

  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold mb-6 text-black">Your Learning Roadmap</h2>
      <div className="h-[700px] border-4 border-indigo-200 rounded-xl overflow-hidden shadow-xl">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          style={flowStyles}
        >
          <Controls />
          <MiniMap style={minimapStyle} zoomable pannable />
          <Background color="#94a3b8" gap={16} variant="dots" />
          <Panel position="top-right">
            <Button onClick={() => onLayout('TB')} className="mr-2">
              <ArrowDownCircle className="mr-2" size={16} />
              Vertical Layout
            </Button>
            <Button onClick={() => onLayout('LR')} className="mr-2">
              <ArrowRightCircle className="mr-2" size={16} />
              Horizontal Layout
            </Button>
            <Button onClick={downloadRoadmapAsPDF}>
              <Download className="mr-2" size={16} />
              Download PDF
            </Button>
          </Panel>
        </ReactFlow>
      </div>
    </div>
  )
}

