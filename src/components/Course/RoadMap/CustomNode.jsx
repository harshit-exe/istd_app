import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { Book, Link, Star } from 'lucide-react';

function CustomNode({ data }) {
  return (
    <div className="bg-white border-2 border-indigo-600 rounded-xl p-4 shadow-lg w-80">
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-indigo-600" />
      <div className="flex items-center justify-between mb-2">
        <div className="font-bold text-xl text-indigo-800">{data.label}</div>
        <Star className="text-yellow-500" size={20} />
      </div>
      <div className="text-sm text-gray-600 mb-2">
        <h4 className="font-semibold mb-1 flex items-center">
          <Book className="mr-2" size={16} />
          Subtopics:
        </h4>
        <ul className="list-disc list-inside">
          {data.subtopics.map((subtopic, index) => (
            <li key={index}>{subtopic}</li>
          ))}
        </ul>
      </div>
      <div className="text-sm text-gray-600">
        <h4 className="font-semibold mb-1 flex items-center">
          <Link className="mr-2" size={16} />
          Resources:
        </h4>
        <ul className="list-disc list-inside">
          {data.resources.map((resource, index) => (
            <li key={index}>
              <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {resource.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-indigo-600" />
    </div>
  );
}

export default memo(CustomNode);

