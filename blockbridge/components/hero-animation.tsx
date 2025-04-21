"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"

export default function HeroAnimation() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const svg = d3.select(svgRef.current)
    const width = svg.node()?.getBoundingClientRect().width || 500
    const height = svg.node()?.getBoundingClientRect().height || 500

    // Clear previous elements
    svg.selectAll("*").remove()

    // Generate some nodes representing people
    const nodeCount = 40
    const nodes = Array.from({ length: nodeCount }, (_, i) => ({
      id: i,
      r: Math.random() * 10 + 5,
      group: Math.floor(Math.random() * 4),
    }))

    // Set up color scale for different groups
    const colors = ["#8b5cf6", "#6366f1", "#d946ef", "#f59e0b"]
    const colorScale = d3.scaleOrdinal().domain([0, 1, 2, 3]).range(colors)

    // Create simulation
    const simulation = d3
      .forceSimulation(nodes)
      .force("charge", d3.forceManyBody().strength(-20))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force(
        "collision",
        d3.forceCollide().radius((d) => (d as any).r * 1.5),
      )

    // Create links between nodes (simulating connections)
    const linkCount = 30
    const links = Array.from({ length: linkCount }, () => ({
      source: Math.floor(Math.random() * nodeCount),
      target: Math.floor(Math.random() * nodeCount),
    }))

    // Add links to simulation
    simulation.force("link", d3.forceLink(links).distance(50))

    // Draw links
    const link = svg
      .append("g")
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("stroke", "#ddd")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", 1)

    // Draw nodes
    const node = svg
      .append("g")
      .selectAll("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("r", (d) => (d as any).r)
      .attr("fill", (d) => colorScale((d as any).group as number))
      .attr("fill-opacity", 0.7)
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)

    // Animate particles and connections
    simulation.on("tick", () => {
      link
        .attr("x1", (d) => (d.source as any).x)
        .attr("y1", (d) => (d.source as any).y)
        .attr("x2", (d) => (d.target as any).x)
        .attr("y2", (d) => (d.target as any).y)

      node.attr("cx", (d) => (d as any).x).attr("cy", (d) => (d as any).y)
    })

    // Pulse animation
    function pulse() {
      node
        .transition()
        .duration(800)
        .attr("r", (d) => (d as any).r * (1 + Math.random() * 0.3))
        .transition()
        .duration(800)
        .attr("r", (d) => (d as any).r)
        .on("end", pulse)
    }

    pulse()

    return () => {
      simulation.stop()
    }
  }, [])

  return <svg ref={svgRef} className="w-full h-full rounded-xl" style={{ background: "transparent" }} />
}

