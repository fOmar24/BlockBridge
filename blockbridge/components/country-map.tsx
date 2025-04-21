"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"

export function CountryMap() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const svg = d3.select(svgRef.current)
    const width = svg.node()?.getBoundingClientRect().width || 960
    const height = svg.node()?.getBoundingClientRect().height || 500

    // Clear previous elements
    svg.selectAll("*").remove()

    // Projection for Africa-centered map
    const projection = d3
      .geoMercator()
      .scale(width * 0.9)
      .center([20, 0]) // Centered on Africa
      .translate([width / 2, height / 2])

    const path = d3.geoPath().projection(projection)

    // Countries with significant BlockBridge presence
    const activeCountries = [
      "Nigeria",
      "Kenya",
      "South Africa",
      "Ghana",
      "Egypt",
      "Rwanda",
      "Ethiopia",
      "Tanzania",
      "Uganda",
      "Senegal",
    ]

    // Sample data for visualization
    const countryData = [
      { country: "Nigeria", users: 3200, color: "#8b5cf6" },
      { country: "Kenya", users: 2100, color: "#8b5cf6" },
      { country: "South Africa", users: 1800, color: "#8b5cf6" },
      { country: "Ghana", users: 1300, color: "#8b5cf6" },
      { country: "Egypt", users: 950, color: "#8b5cf6" },
      { country: "Rwanda", users: 780, color: "#8b5cf6" },
      { country: "Ethiopia", users: 620, color: "#8b5cf6" },
      { country: "Tanzania", users: 560, color: "#8b5cf6" },
      { country: "Uganda", users: 480, color: "#8b5cf6" },
      { country: "Senegal", users: 410, color: "#8b5cf6" },
    ]

    const radiusScale = d3
      .scaleSqrt()
      .domain([0, d3.max(countryData, (d) => d.users) || 3200])
      .range([0, 30])

    const colorScale = d3
      .scaleLinear<string>()
      .domain([0, d3.max(countryData, (d) => d.users) || 3200])
      .range(["#c4b5fd", "#7c3aed"])

    // Load world map data
    // Note: In a real implementation, we would load the actual world.json data
    // For this example, we'll simulate the map rendering

    // This would normally be:
    // d3.json("https://unpkg.com/world-atlas@2/countries-110m.json").then(world => {

    // Create a group for the map
    const map = svg.append("g")

    // Simulate countries
    map.append("path").attr("d", "M0,0 L0,500 L960,500 L960,0 Z").attr("fill", "#f1f5f9").attr("stroke", "#e2e8f0")

    // Add circles for each country with data
    const circles = svg
      .append("g")
      .selectAll("circle")
      .data(countryData)
      .enter()
      .append("circle")
      .attr("cx", (d, i) => 100 + i * 80)
      .attr("cy", height / 2)
      .attr("r", (d) => radiusScale(d.users))
      .attr("fill", (d) => colorScale(d.users))
      .attr("fill-opacity", 0.7)
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)

    // Add labels
    svg
      .append("g")
      .selectAll("text")
      .data(countryData)
      .enter()
      .append("text")
      .attr("x", (d, i) => 100 + i * 80)
      .attr("y", height / 2 + 50)
      .attr("text-anchor", "middle")
      .attr("font-size", "10px")
      .attr("fill", "#4b5563")
      .text((d) => d.country)

    // Note: In a production app, we would properly render the world map
    // and position the circles at the centroids of each country.

    return () => {
      svg.selectAll("*").remove()
    }
  }, [])

  return <svg ref={svgRef} className="w-full h-full" style={{ background: "#f8fafc" }} />
}

