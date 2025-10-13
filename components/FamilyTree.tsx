"use client";

import { useCallback, useState } from "react";
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  BackgroundVariant,
} from "reactflow";
import "reactflow/dist/style.css";
import TreeCard from "./TreeCard";
import ChildCard from "./ChildCard";
import AgentDetailsPanel from "./AgentDetailsPanel";

const nodeTypes = {
  treeCard: TreeCard,
  childCard: ChildCard,
};

const initialNodes: Node[] = [
    {
      id: "parent",
      type: "treeCard",
      position: { x: 550, y: 20 },
      data: {
        title: "dr4gon",
        description: "The ancient and powerful progenitor of the dragon lineage.",
        number: "#1",
        tokenCA: "",
        tokenValue: "N/A",
        walletAddress: "",
        balance: "N/A",
        healthPoints: 100,
        breedProgress: 0,
        badges: ["TEE RUNNING", "BREED INCOMPLETE"],
        tags: ["STRATEGIC", "CUNNING", "LUCKY"],
      },
      draggable: false,
      selectable: false,
    },
  {
      id: "child1",
      type: "childCard",
      position: { x: -80, y: 700 },
      data: {
        title: "GEN 2",
        variant: "red",
      },
      draggable: false,
      selectable: false,
    },
    {
      id: "child2",
      type: "childCard",
      position: { x: 340, y: 700 },
      data: {
        title: "GEN 2",
        variant: "orange",
      },
      draggable: false,
      selectable: false,
    },
    {
      id: "child3",
      type: "childCard",
      position: { x: 760, y: 700 },
      data: {
        title: "GEN 2",
        variant: "amber",
      },
      draggable: false,
      selectable: false,
    },
    {
      id: "child4",
      type: "childCard",
      position: { x: 1180, y: 700 },
      data: {
        title: "GEN 2",
        variant: "rose",
      },
      draggable: false,
      selectable: false,
    },
];

const initialEdges: Edge[] = [
  {
    id: "parent-child1",
    source: "parent",
    target: "child1",
    type: "smoothstep",
    animated: true,
    style: { stroke: "#fb923c", strokeWidth: 2, strokeDasharray: "5 5" },
    pathOptions: { offset: 0, borderRadius: 0 },
  },
  {
    id: "parent-child2",
    source: "parent",
    target: "child2",
    type: "smoothstep",
    animated: true,
    style: { stroke: "#fb923c", strokeWidth: 2, strokeDasharray: "5 5" },
    pathOptions: { offset: 0, borderRadius: 0 },
  },
  {
    id: "parent-child3",
    source: "parent",
    target: "child3",
    type: "smoothstep",
    animated: true,
    style: { stroke: "#fb923c", strokeWidth: 2, strokeDasharray: "5 5" },
    pathOptions: { offset: 0, borderRadius: 0 },
  },
  {
    id: "parent-child4",
    source: "parent",
    target: "child4",
    type: "smoothstep",
    animated: true,
    style: { stroke: "#fb923c", strokeWidth: 2, strokeDasharray: "5 5" },
    pathOptions: { offset: 0, borderRadius: 0 },
  },
];

export default function FamilyTree() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedNodeData, setSelectedNodeData] = useState<any>(null);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    console.log('Node clicked:', node);
    if (node.type === 'treeCard') {
      console.log('Opening panel with data:', node.data);
      setSelectedNodeData(node.data);
      setIsPanelOpen(true);
    }
  }, []);

  return (
    <>
      <div className="w-full h-[calc(100vh-80px)]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={handleNodeClick}
        nodeTypes={nodeTypes}
        fitView
        defaultViewport={{ x: 0, y: 0, zoom: 0.65 }}
        nodesDraggable={false}
        nodesConnectable={false}
        nodesFocusable={true}
        elementsSelectable={true}
        selectNodesOnDrag={false}
        className="bg-gradient-to-br from-black via-red-950/20 to-black"
        proOptions={{ hideAttribution: true }}
      >
        <Controls className="!bg-red-950/80 !border-red-800/50 [&_button]:!bg-red-900/70 [&_button]:!border-red-700/50 [&_button]:!fill-red-100 hover:[&_button]:!bg-red-800/70" />
        <Background 
          variant={BackgroundVariant.Dots} 
          gap={16} 
          size={1} 
          color="#7f1d1d"
        />
      </ReactFlow>
    </div>

    {/* Agent Details Panel - rendered outside React Flow */}
    {selectedNodeData && (
      <AgentDetailsPanel 
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        data={selectedNodeData}
      />
    )}
    </>
  );
}

