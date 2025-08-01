"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import {
  MapPin,
  Plus,
  Search,
  Menu,
  LogOut,
  Star,
  Camera,
  List,
  Eye,
  EyeOff,
  ArrowRight,
  UserPlus,
  Key,
  ArrowLeft,
  Check,
  Save,
  Volume2,
  Navigation,
  Heart,
  User,
  Mail,
  Lock,
  MessageCircle,
  Loader2,
  CheckCircle,
  AlertCircle,
  Filter,
  X,
  Accessibility,
  RotateCcw,
  ShipWheelIcon as Wheelchair,
  EarOff,
  Brain,
  Baby,
  Clock,
  Scale,
  CuboidIcon as Crutches,
  Users,
} from "lucide-react"

// Ícones personalizados para cada tipo de acessibilidade
const AccessibilityIcons = {
  rampa: ({ className = "w-6 h-6", color = "#4b5563" }: { className?: string; color?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3 18L21 6M21 6V14M21 6H13"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M3 18H8L12 14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  banheiro: ({ className = "w-6 h-6", color = "#6b7280" }: { className?: string; color?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="18" rx="2" stroke={color} strokeWidth="2" fill="none" />
      <circle cx="8" cy="8" r="2" fill={color} />
      <path d="M8 12v6" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M6 15h4" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <circle cx="16" cy="8" r="2" fill={color} />
      <path d="M16 12v6" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M14 15h4" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M14 12h4" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  elevador: ({ className = "w-6 h-6", color = "#374151" }: { className?: string; color?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="2" width="16" height="20" rx="2" stroke={color} strokeWidth="2" fill="none" />
      <path d="M8 6L12 2L16 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 18L12 22L16 18" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="7" y1="10" x2="17" y2="10" stroke={color} strokeWidth="1" />
      <line x1="7" y1="14" x2="17" y2="14" stroke={color} strokeWidth="1" />
    </svg>
  ),
  piso: ({ className = "w-6 h-6", color = "#9ca3af" }: { className?: string; color?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z" fill={color} />
      <path
        d="M21 9V7L15 7.5L13.5 7L11 7.5C9.84 7.89 9 8.94 9 10.2V11H11V10.5C11 10.22 11.22 10 11.5 10L12 9.5L13 10L15 9.5L19 9.5V11H21V9Z"
        fill={color}
      />
      <path d="M13 12H11V22H13V12Z" fill={color} />
      <path d="M15 12H17V22H15V12Z" fill={color} />
      <circle cx="4" cy="4" r="1" fill={color} />
      <circle cx="8" cy="4" r="1" fill={color} />
      <circle cx="4" cy="8" r="1" fill={color} />
      <circle cx="8" cy="8" r="1" fill={color} />
      <circle cx="4" cy="12" r="1" fill={color} />
      <circle cx="8" cy="12" r="1" fill={color} />
    </svg>
  ),
  sinalizacao: ({ className = "w-6 h-6", color = "#6b7280" }: { className?: string; color?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill="none" />
      <path d="M8 12h8" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M12 8v8" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="12" r="3" fill={color} />
      <path d="M16.24 7.76L18.36 5.64" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M7.76 16.24L5.64 18.36" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M16.24 16.24L18.36 18.36" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M7.76 7.76L5.64 5.64" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  corrimao: ({ className = "w-6 h-6", color = "#4b5563" }: { className?: string; color?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 12h18" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <path d="M6 8v8" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M12 8v8" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M18 8v8" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <circle cx="6" cy="8" r="2" fill={color} />
      <circle cx="12" cy="8" r="2" fill={color} />
      <circle cx="18" cy="8" r="2" fill={color} />
    </svg>
  ),
  vagas: ({ className = "w-6 h-6", color = "#374151" }: { className?: string; color?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="6" width="20" height="12" rx="2" stroke={color} strokeWidth="2" fill="none" />
      <path d="M7 10V14" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M7 10H10C10.55 10 11 10.45 11 11V13C11 13.55 10.55 14 10 14H7" stroke={color} strokeWidth="2" />
      <circle cx="16" cy="9" r="1.5" fill={color} />
      <path d="M14.5 11.5C14.5 11.5 15 12 16 12C17 12 17.5 11.5 17.5 11.5V14.5H14.5V11.5Z" fill={color} />
      <path d="M6 18V20" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M18 18V20" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  audio: ({ className = "w-6 h-6", color = "#6b7280" }: { className?: string; color?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11 5L6 9H2V15H6L11 19V5Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={color}
      />
      <path
        d="M19.07 4.93C20.9 6.76 20.9 9.24 19.07 11.07"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.54 8.46C16.15 9.07 16.15 10.93 15.54 11.54"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  braille: ({ className = "w-6 h-6", color = "#4b5563" }: { className?: string; color?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="6" cy="6" r="2" fill={color} />
      <circle cx="6" cy="12" r="2" fill={color} />
      <circle cx="6" cy="18" r="2" fill={color} />
      <circle cx="12" cy="6" r="2" fill={color} />
      <circle cx="12" cy="18" r="2" fill={color} />
      <circle cx="18" cy="6" r="2" fill={color} />
      <circle cx="18" cy="12" r="2" fill={color} />
      <circle cx="18" cy="18" r="2" fill={color} />
    </svg>
  ),
  circulacao: ({ className = "w-6 h-6", color = "#9ca3af" }: { className?: string; color?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 17L17 7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 7H17V17" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 12H7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 12H21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 3V7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 17V21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
}

const tiposAcessibilidade = [
  { value: "rampa", label: "🛤️ Rampa de acesso", color: "#4b5563" },
  { value: "banheiro", label: "🚻 Banheiro adaptado", color: "#6b7280" },
  { value: "elevador", label: "🛗 Elevador acessível", color: "#374151" },
  { value: "piso", label: "👣 Piso tátil", color: "#9ca3af" },
  { value: "sinalizacao", label: "🔍 Sinalização tátil", color: "#6b7280" },
  { value: "corrimao", label: "🤚 Corrimão", color: "#4b5563" },
  { value: "vagas", label: "🅿️ Vagas especiais", color: "#374151" },
  { value: "audio", label: "🔊 Sinalização sonora", color: "#6b7280" },
  { value: "braille", label: "⠃ Sinalização em Braille", color: "#4b5563" },
  { value: "circulacao", label: "↔️ Espaço para circulação", color: "#9ca3af" },
]

const necessidades = [
  { value: "cadeirante", label: "Cadeirante", icon: Wheelchair },
  { value: "baixa-visao", label: "Baixa visão", icon: Eye },
  { value: "cegueira", label: "Cegueira", icon: EyeOff },
  { value: "surdez", label: "Surdez", icon: EarOff },
  { value: "deficiencia-auditiva", label: "Deficiência auditiva", icon: Volume2 },
  { value: "deficiencia-motora", label: "Deficiência motora", icon: Crutches },
  { value: "deficiencia-intelectual", label: "Deficiência intelectual", icon: Brain },
  { value: "autismo", label: "Autismo", icon: Users },
  { value: "mobilidade-reduzida", label: "Mobilidade reduzida", icon: Navigation },
  { value: "obesidade", label: "Obesidade", icon: Scale },
  { value: "gestante", label: "Gestante", icon: Baby },
  { value: "idoso", label: "Idoso", icon: Clock },
]

// Componente do Mapa Leaflet
function LeafletMap({ onMapClick, locations, clickedPosition, searchLocation }: any) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      rampa: "#4b5563",
      banheiro: "#6b7280",
      elevador: "#374151",
      piso: "#9ca3af",
      sinalizacao: "#6b7280",
      corrimao: "#4b5563",
      vagas: "#374151",
      audio: "#6b7280",
      braille: "#4b5563",
      circulacao: "#9ca3af",
    }
    return colors[type] || "#6b7280"
  }

  const adjustColor = (color: string, amount: number) => {
    const num = Number.parseInt(color.replace("#", ""), 16)
    const amt = Math.round(2.55 * amount)
    const R = (num >> 16) + amt
    const G = ((num >> 8) & 0x00ff) + amt
    const B = (num & 0x0000ff) + amt
    return `#${(
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)}`
  }

  const getIconPath = (type: string, color = "white", strokeWidth = "1.5") => {
    const paths: { [key: string]: string } = {
      rampa: `<path d="M3 18L21 6M21 6V14M21 6H13" stroke="${color}" strokeWidth="${strokeWidth}" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 18H8L12 14" stroke="${color}" strokeWidth="${strokeWidth}" strokeLinecap="round" strokeLinejoin="round"/>`,
      banheiro: `<rect x="3" y="3" width="18" height="18" rx="2" stroke="${color}" strokeWidth="${strokeWidth}" fill="none"/><circle cx="8" cy="8" r="1.5" fill="${color}"/><path d="M8 11v5" stroke="${color}" strokeWidth="${strokeWidth}" strokeLinecap="round"/><path d="M6.5 13.5h3" stroke="${color}" strokeWidth="${strokeWidth}" strokeLinecap="round"/><circle cx="16" cy="8" r="1.5" fill="${color}"/><path d="M16 11v5" stroke="${color}" strokeWidth="${strokeWidth}" strokeLinecap="round"/><path d="M14.5 13.5h3" stroke="${color}" strokeWidth="${strokeWidth}" strokeLinecap="round"/><path d="M14.5 11h3" stroke="${color}" strokeWidth="${strokeWidth}" strokeLinecap="round"/>`,
      elevador: `<rect x="4" y="2" width="16" height="20" rx="2" stroke="${color}" strokeWidth="${strokeWidth}" fill="none"/><path d="M8 6L12 2L16 6" stroke="${color}" strokeWidth="${strokeWidth}" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 18L12 22L16 18" stroke="${color}" strokeWidth="${strokeWidth}" strokeLinecap="round" strokeLinejoin="round"/><line x1="7" y1="10" x2="17" y2="10" stroke="${color}" strokeWidth="1"/><line x1="7" y1="14" x2="17" y2="14" stroke="${color}" strokeWidth="1"/>`,
      piso: `<circle cx="4" cy="4" r="1" fill="${color}"/><circle cx="8" cy="4" r="1" fill="${color}"/><circle cx="4" cy="8" r="1" fill="${color}"/><circle cx="8" cy="8" r="1" fill="${color}"/><circle cx="4" cy="12" r="1" fill="${color}"/><circle cx="8" cy="12" r="1" fill="${color}"/><path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z" fill="${color}"/><path d="M13 12H11V22H13V12Z" fill="${color}"/><path d="M15 12H17V22H15V12Z" fill="${color}"/>`,
      sinalizacao: `<circle cx="12" cy="12" r="8" stroke="${color}" strokeWidth="${strokeWidth}" fill="none"/><path d="M8 12h8" stroke="${color}" strokeWidth="${strokeWidth}" strokeLinecap="round"/><path d="M12 8v8" stroke="${color}" strokeWidth="${strokeWidth}" strokeLinecap="round"/><circle cx="12" cy="12" r="2" fill="${color}"/>`,
      corrimao: `<path d="M3 12h18" stroke="${color}" strokeWidth="2" strokeLinecap="round"/><path d="M6 8v8" stroke="${color}" strokeWidth="${strokeWidth}" strokeLinecap="round"/><path d="M12 8v8" stroke="${color}" strokeWidth="${strokeWidth}" strokeLinecap="round"/><path d="M18 8v8" stroke="${color}" strokeWidth="${strokeWidth}" strokeLinecap="round"/><circle cx="6" cy="8" r="1.5" fill="${color}"/><circle cx="12" cy="8" r="1.5" fill="${color}"/><circle cx="18" cy="8" r="1.5" fill="${color}"/>`,
      vagas: `<rect x="2" y="6" width="20" height="12" rx="2" stroke="${color}" strokeWidth="${strokeWidth}" fill="none"/><path d="M7 10V14" stroke="${color}" strokeWidth="${strokeWidth}" strokeLinecap="round"/><path d="M7 10H10C10.55 10 11 10.45 11 11V13C11 13.55 10.55 14 10 14H7" stroke="${color}" strokeWidth="${strokeWidth}"/><circle cx="16" cy="9" r="1" fill="${color}"/><path d="M14.5 11.5C14.5 11.5 15 12 16 12C17 12 17.5 11.5 17.5 11.5V14.5H14.5V11.5Z" fill="${color}"/>`,
      audio: `<path d="M11 5L6 9H2V15H6L11 19V5Z" stroke="${color}" strokeWidth="${strokeWidth}" strokeLinecap="round" strokeLinejoin="round" fill="${color}"/><path d="M19.07 4.93C20.9 6.76 20.9 9.24 19.07 11.07" stroke="${color}" strokeWidth="${strokeWidth}" strokeLinecap="round" strokeLinejoin="round"/><path d="M15.54 8.46C16.15 9.07 16.15 10.93 15.54 11.54" stroke="${color}" strokeWidth="${strokeWidth}" strokeLinecap="round" strokeLinejoin="round"/>`,
      braille: `<circle cx="6" cy="6" r="1.5" fill="${color}"/><circle cx="6" cy="12" r="1.5" fill="${color}"/><circle cx="6" cy="18" r="1.5" fill="${color}"/><circle cx="12" cy="6" r="1.5" fill="${color}"/><circle cx="12" cy="18" r="1.5" fill="${color}"/><circle cx="18" cy="6" r="1.5" fill="${color}"/><circle cx="18" cy="12" r="1.5" fill="${color}"/><circle cx="18" cy="18" r="1.5" fill="${color}"/>`,
      circulacao: `<path d="M7 17L17 7" stroke="${color}" strokeWidth="${strokeWidth}" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 7H17V17" stroke="${color}" strokeWidth="${strokeWidth}" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 12H7" stroke="${color}" strokeWidth="${strokeWidth}" strokeLinecap="round" strokeLinejoin="round"/><path d="M17 12H21" stroke="${color}" strokeWidth="${strokeWidth}" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 3V7" stroke="${color}" strokeWidth="${strokeWidth}" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 17V21" stroke="${color}" strokeWidth="${strokeWidth}" strokeLinecap="round" strokeLinejoin="round"/>`,
    }
    return paths[type] || `<circle cx="12" cy="12" r="6" fill="${color}"/>`
  }

  useEffect(() => {
    if (typeof window !== "undefined" && mapRef.current && !mapInstanceRef.current) {
      import("leaflet").then((L) => {
        delete (L.Icon.Default.prototype as any)._getIconUrl
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
          iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
          shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        })

        const map = L.map(mapRef.current!).setView([-23.52437655664778, -47.46314621710714], 16)

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map)

        map.on("click", (e: any) => {
          onMapClick(e.latlng)
        })

        mapInstanceRef.current = map
      })
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (mapInstanceRef.current && typeof window !== "undefined") {
      import("leaflet").then((L) => {
        markersRef.current.forEach((marker) => {
          mapInstanceRef.current.removeLayer(marker)
        })
        markersRef.current = []

        locations.forEach((location: any) => {
          const primaryType = location.accessibilityTypes?.[0] || location.typeValue || "rampa"
          const iconColor = getTypeColor(primaryType)

          const multipleIcons =
            location.accessibilityTypes?.length > 1
              ? location.accessibilityTypes
                  .slice(0, 3)
                  .map((type: string, index: number) => {
                    const angle = index * 120 - 60
                    const radius = 12
                    const x = Math.cos((angle * Math.PI) / 180) * radius
                    const y = Math.sin((angle * Math.PI) / 180) * radius
                    return `
                <div style="
                  position: absolute;
                  top: ${20 + y}px;
                  left: ${22 + x}px;
                  width: 16px;
                  height: 16px;
                  background: ${getTypeColor(type)};
                  border-radius: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  border: 2px solid white;
                  box-shadow: 0 1px 3px rgba(0,0,0,0.3);
                ">
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    ${getIconPath(type, "white", "0.8")}
                  </svg>
                </div>
              `
                  })
                  .join("")
              : ""

          const iconSvg = `
            <div style="position: relative;">
              <div style="
                background: linear-gradient(135deg, ${iconColor}, ${adjustColor(iconColor, -20)});
                width: 44px;
                height: 44px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                border: 3px solid white;
                position: relative;
              ">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  ${getIconPath(primaryType)}
                </svg>
                ${location.rating ? `<div style="position: absolute; top: -8px; right: -8px; background: #fbbf24; color: white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; border: 2px solid white;">${location.rating}</div>` : ""}
              </div>
              ${multipleIcons}
              ${
                location.accessibilityTypes?.length > 3
                  ? `
                <div style="
                  position: absolute;
                  top: 35px;
                  right: -5px;
                  background: #6b7280;
                  color: white;
                  border-radius: 50%;
                  width: 18px;
                  height: 18px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 10px;
                  font-weight: bold;
                  border: 2px solid white;
                  box-shadow: 0 1px 3px rgba(0,0,0,0.3);
                ">+${location.accessibilityTypes.length - 3}</div>
              `
                  : ""
              }
            </div>
          `

          const marker = L.marker([location.lat || -23.524, location.lng || -47.463], {
            icon: L.divIcon({
              className: "custom-marker",
              html: iconSvg,
              iconSize: [44, 44],
              iconAnchor: [22, 44],
            }),
          })
            .addTo(mapInstanceRef.current)
            .bindPopup(`
              <div style="font-family: system-ui; line-height: 1.5; min-width: 280px; max-width: 350px;">
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid #e5e7eb;">
                  <div style="background: linear-gradient(135deg, ${iconColor}, ${adjustColor(iconColor, -20)}); width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      ${getIconPath(primaryType)}
                    </svg>
                  </div>
                  <div>
                    <h4 style="margin: 0; font-size: 16px; font-weight: 600; color: #1f2937;">${location.name}</h4>
                    <p style="margin: 2px 0 0 0; font-size: 12px; color: #6b7280;">${location.accessibilityTypes?.length || 1} tipo(s) de acessibilidade</p>
                  </div>
                </div>
                <p style="margin: 4px 0; font-size: 14px; color: #6b7280; display: flex; align-items: center; gap: 6px;">
                  <span>📍</span> ${location.address}
                </p>
                ${location.rating ? `<p style="margin: 4px 0; font-size: 14px; display: flex; align-items: center; gap: 6px;"><span>⭐</span> ${"★".repeat(location.rating)}${"☆".repeat(5 - location.rating)}</p>` : ""}
                
                <div style="margin: 12px 0;">
                  <p style="font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 8px;">Recursos de Acessibilidade:</p>
                  <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                    ${(location.accessibilityTypes || [location.typeValue])
                      .map((type: string) => {
                        const tipoInfo = tiposAcessibilidade.find((t) => t.value === type)
                        return `
                        <div style="
                          display: flex;
                          align-items: center;
                          gap: 4px;
                          background: ${tipoInfo?.color}20;
                          color: ${tipoInfo?.color};
                          padding: 4px 8px;
                          border-radius: 12px;
                          font-size: 11px;
                          font-weight: 500;
                          border: 1px solid ${tipoInfo?.color}40;
                        ">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            ${getIconPath(type, tipoInfo?.color, "1")}
                          </svg>
                          ${tipoInfo?.label.replace(/^.+?\s/, "") || type}
                        </div>
                      `
                      })
                      .join("")}
                  </div>
                </div>
                
                ${location.description ? `<p style="margin: 8px 0 0 0; font-size: 14px; color: #374151; padding: 8px; background: #f3f4f6; border-radius: 6px;">${location.description}</p>` : ""}
                <small style="margin-top: 8px; display: block; color: #9ca3af; font-size: 12px;">Adicionado por Usuário</small>
              </div>
            `)

          markersRef.current.push(marker)
        })

        if (clickedPosition) {
          const clickMarker = L.marker([clickedPosition.lat, clickedPosition.lng], {
            icon: L.divIcon({
              className: "click-marker",
              html: '<div style="background: #374151; color: white; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px; box-shadow: 0 4px 12px rgba(55, 65, 81, 0.4); border: 3px solid white; animation: bounce 1s ease-in-out infinite;">📍</div>',
              iconSize: [36, 36],
              iconAnchor: [18, 36],
            }),
          }).addTo(mapInstanceRef.current)

          markersRef.current.push(clickMarker)
        }
      })
    }
  }, [locations, clickedPosition])

  useEffect(() => {
    if (searchLocation && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([searchLocation.lat, searchLocation.lng], 18)

      markersRef.current.forEach((marker) => {
        if (marker.getLatLng().lat === searchLocation.lat && marker.getLatLng().lng === searchLocation.lng) {
          marker.openPopup()
        }
      })
    }
  }, [searchLocation])

  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
        integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
        crossOrigin=""
      />
      <style jsx>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .custom-marker {
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
        }
      `}</style>
      <div ref={mapRef} className="w-full h-full rounded-lg shadow-inner" style={{ minHeight: "400px" }} />
    </>
  )
}

export default function MapaAcessivel() {
  const { toast } = useToast()

  // Estados para o cadastro
  const [registerStep, setRegisterStep] = useState(1)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([])
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  // Estados para recuperação de senha
  const [recoveryStep, setRecoveryStep] = useState(1)
  const [recoveryData, setRecoveryData] = useState({
    email: "",
    verificationCode: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [sentCode, setSentCode] = useState("")
  const [codeTimer, setCodeTimer] = useState(0)
  const [isResendingCode, setIsResendingCode] = useState(false)

  // Estados principais
  const [currentView, setCurrentView] = useState<"login" | "register" | "recovery" | "map">("login")
  const [showPassword, setShowPassword] = useState(false)
  const [selectedRating, setSelectedRating] = useState(0)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [clickedPosition, setClickedPosition] = useState<{ lat: number; lng: number } | null>(null)

  // Estados para pesquisa
  const [searchTerm, setSearchTerm] = useState("")
  const [filterTerm, setFilterTerm] = useState("")
  const [searchLocation, setSearchLocation] = useState<any>(null)
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [searchSuggestions, setSearchSuggestions] = useState<any[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false)
  const [advancedSearchFilters, setAdvancedSearchFilters] = useState({
    minRating: 0,
    maxDistance: 10,
    hasDescription: false,
    accessibilityCount: 0,
  })

  // Estados para adicionar locais
  const [selectedAccessibilityTypes, setSelectedAccessibilityTypes] = useState<string[]>([])
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    type: "",
    description: "",
  })

  const [locations, setLocations] = useState([
    {
      id: 1,
      name: "Shopping Center Acessível",
      address: "Rua das Flores, 123",
      type: "🛤️ Rampa de acesso",
      typeValue: "rampa",
      accessibilityTypes: ["rampa", "banheiro", "elevador", "vagas"],
      rating: 5,
      description: "Excelente acessibilidade com rampas, banheiros adaptados, elevadores e vagas especiais",
      lat: -23.52437655664778,
      lng: -47.46314621710714,
    },
    {
      id: 2,
      name: "Biblioteca Municipal",
      address: "Av. Central, 456",
      type: "🛗 Elevador acessível",
      typeValue: "elevador",
      accessibilityTypes: ["elevador", "piso", "braille"],
      rating: 4,
      description: "Elevador adaptado, piso tátil e sinalização em Braille",
      lat: -23.52537655664778,
      lng: -47.46414621710714,
    },
    {
      id: 3,
      name: "Hospital São José",
      address: "Rua da Saúde, 789",
      type: "🚻 Banheiro adaptado",
      typeValue: "banheiro",
      accessibilityTypes: ["banheiro", "rampa", "vagas", "corrimao", "sinalizacao"],
      rating: 5,
      description: "Completa infraestrutura de acessibilidade para todos os tipos de necessidades",
      lat: -23.52337655664778,
      lng: -47.46514621710714,
    },
    {
      id: 4,
      name: "Estação de Metrô Central",
      address: "Praça da Estação, 100",
      type: "👣 Piso tátil",
      typeValue: "piso",
      accessibilityTypes: ["piso", "audio", "braille"],
      rating: 4,
      description: "Piso tátil, sinalização sonora e Braille para deficientes visuais",
      lat: -23.52637655664778,
      lng: -47.46214621710714,
    },
    {
      id: 5,
      name: "Banco do Brasil",
      address: "Rua Comercial, 321",
      type: "🔊 Sinalização sonora",
      typeValue: "audio",
      accessibilityTypes: ["audio", "braille"],
      rating: 3,
      description: "Caixas eletrônicos com sinalização sonora e Braille",
      lat: -23.52137655664778,
      lng: -47.46614621710714,
    },
  ])

  // Funções auxiliares
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const getPasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength += 25
    if (/[A-Z]/.test(password)) strength += 25
    if (/[0-9]/.test(password)) strength += 25
    if (/[^A-Za-z0-9]/.test(password)) strength += 25
    return strength
  }

  const canProceedToStep2 = () => {
    return (
      registerData.firstName.length >= 2 &&
      registerData.lastName.length >= 2 &&
      isValidEmail(registerData.email) &&
      getPasswordStrength(registerData.password) >= 80 &&
      registerData.password === registerData.confirmPassword
    )
  }

  const toggleNeed = (needValue: string) => {
    setSelectedNeeds((prev) => (prev.includes(needValue) ? prev.filter((n) => n !== needValue) : [...prev, needValue]))
  }

  const toggleAccessibilityType = (typeValue: string) => {
    setSelectedAccessibilityTypes((prev) =>
      prev.includes(typeValue) ? prev.filter((t) => t !== typeValue) : [...prev, typeValue],
    )
  }

  const handleMapClick = (latlng: { lat: number; lng: number }) => {
    setClickedPosition(latlng)
    setFormData((prev) => ({
      ...prev,
      address: `Lat: ${latlng.lat.toFixed(6)}, Lng: ${latlng.lng.toFixed(6)}`,
    }))

    toast({
      title: "Localização selecionada!",
      description: "Agora preencha o formulário para adicionar o local.",
      duration: 3000,
    })
  }

  const handleSaveLocation = (e: React.FormEvent) => {
    e.preventDefault()

    if (!clickedPosition) {
      toast({
        title: "Erro",
        description: "Por favor, selecione uma localização no mapa clicando nele.",
        variant: "destructive",
      })
      return
    }

    if (!formData.name.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, informe o nome do local.",
        variant: "destructive",
      })
      return
    }

    if (selectedAccessibilityTypes.length === 0) {
      toast({
        title: "Erro",
        description: "Por favor, selecione pelo menos um tipo de acessibilidade.",
        variant: "destructive",
      })
      return
    }

    const primaryType = selectedAccessibilityTypes[0]
    const selectedTypeInfo = tiposAcessibilidade.find((t) => t.value === primaryType)

    const newLocation = {
      id: Date.now(),
      name: formData.name.trim(),
      address: formData.address,
      type: selectedTypeInfo?.label || primaryType,
      typeValue: primaryType,
      accessibilityTypes: selectedAccessibilityTypes,
      rating: selectedRating,
      description: formData.description.trim(),
      lat: clickedPosition.lat,
      lng: clickedPosition.lng,
    }

    setLocations((prev) => [...prev, newLocation])

    setFormData({ name: "", address: "", type: "", description: "" })
    setSelectedRating(0)
    setSelectedAccessibilityTypes([])
    setClickedPosition(null)

    toast({
      title: "Sucesso!",
      description: `Local adicionado com ${selectedAccessibilityTypes.length} tipo(s) de acessibilidade.`,
      duration: 3000,
    })
  }

  const performIntelligentSearch = (query: string) => {
    const normalizedQuery = query.toLowerCase().trim()
    if (!normalizedQuery) return []

    return locations.filter((location) => {
      const nameMatch = location.name.toLowerCase().includes(normalizedQuery)
      const addressMatch = location.address.toLowerCase().includes(normalizedQuery)
      const descriptionMatch = location.description?.toLowerCase().includes(normalizedQuery)
      const accessibilityMatch = (location.accessibilityTypes || [location.typeValue]).some((type) => {
        const tipoInfo = tiposAcessibilidade.find((t) => t.value === type)
        return tipoInfo?.label.toLowerCase().includes(normalizedQuery) || type.toLowerCase().includes(normalizedQuery)
      })

      return nameMatch || addressMatch || descriptionMatch || accessibilityMatch
    })
  }

  const generateSearchSuggestions = (query: string) => {
    if (!query || query.length < 2) return []

    const suggestions = []
    const normalizedQuery = query.toLowerCase()

    locations.forEach((location) => {
      if (location.name.toLowerCase().includes(normalizedQuery)) {
        suggestions.push({
          type: "location",
          text: location.name,
          subtitle: location.address,
          data: location,
        })
      }
    })

    tiposAcessibilidade.forEach((tipo) => {
      if (tipo.label.toLowerCase().includes(normalizedQuery)) {
        const count = locations.filter((loc) => (loc.accessibilityTypes || [loc.typeValue]).includes(tipo.value)).length
        suggestions.push({
          type: "accessibility",
          text: tipo.label.replace(/^.+?\s/, ""),
          subtitle: `${count} local(is) disponível(is)`,
          data: tipo,
        })
      }
    })

    return suggestions
      .filter((suggestion, index, self) => index === self.findIndex((s) => s.text === suggestion.text))
      .slice(0, 8)
  }

  const handleGlobalSearch = async () => {
    if (!searchTerm.trim()) {
      toast({
        title: "Aviso",
        description: "Digite algo para pesquisar.",
        variant: "destructive",
      })
      return
    }

    setIsSearching(true)
    await new Promise((resolve) => setTimeout(resolve, 300))

    const results = performIntelligentSearch(searchTerm)
    setSearchResults(results)

    if (!searchHistory.includes(searchTerm)) {
      const newHistory = [searchTerm, ...searchHistory.slice(0, 9)]
      setSearchHistory(newHistory)
      localStorage.setItem("searchHistory", JSON.stringify(newHistory))
    }

    if (results.length > 0) {
      const firstResult = results[0]
      setSearchLocation(firstResult)
      setFilterTerm(searchTerm)

      toast({
        title: "Pesquisa realizada!",
        description: `${results.length} local(is) encontrado(s). Focalizando no primeiro resultado.`,
      })
    } else {
      toast({
        title: "Nenhum resultado",
        description: "Nenhum local encontrado. Tente termos diferentes ou use filtros.",
        variant: "destructive",
      })
    }

    setIsSearching(false)
    setShowSuggestions(false)
  }

  const getFilteredLocations = () => {
    let filtered = locations

    if (activeFilters.length > 0) {
      filtered = filtered.filter((location) =>
        activeFilters.some((filter) => (location.accessibilityTypes || [location.typeValue]).includes(filter)),
      )
    }

    if (filterTerm) {
      filtered = performIntelligentSearch(filterTerm)
    }

    if (showAdvancedSearch) {
      filtered = filtered.filter((location) => {
        if (advancedSearchFilters.minRating > 0 && location.rating < advancedSearchFilters.minRating) {
          return false
        }
        if (advancedSearchFilters.hasDescription && !location.description?.trim()) {
          return false
        }
        const accessibilityCount = location.accessibilityTypes?.length || 1
        if (
          advancedSearchFilters.accessibilityCount > 0 &&
          accessibilityCount < advancedSearchFilters.accessibilityCount
        ) {
          return false
        }
        return true
      })
    }

    filtered.sort((a, b) => {
      const aCount = a.accessibilityTypes?.length || 1
      const bCount = b.accessibilityTypes?.length || 1
      if (aCount !== bCount) return bCount - aCount
      return (b.rating || 0) - (a.rating || 0)
    })

    return filtered
  }

  const handleSearchInputChange = (value: string) => {
    setSearchTerm(value)

    if (value.length >= 2) {
      const suggestions = generateSearchSuggestions(value)
      setSearchSuggestions(suggestions)
      setShowSuggestions(suggestions.length > 0)
    } else {
      setShowSuggestions(false)
    }
  }

  const handleSuggestionSelect = (suggestion: any) => {
    setSearchTerm(suggestion.text)
    setShowSuggestions(false)

    if (suggestion.type === "location") {
      setSearchLocation(suggestion.data)
      setFilterTerm(suggestion.text)
    } else if (suggestion.type === "accessibility") {
      handleFilterToggle(suggestion.data.value)
    }
  }

  useEffect(() => {
    const savedHistory = localStorage.getItem("searchHistory")
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory))
    }
  }, [])

  const handleLocationClick = (location: any) => {
    setSearchLocation(location)
    toast({
      title: "Navegando para local",
      description: `Focalizando em: ${location.name}`,
    })
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!acceptTerms) {
      toast({
        title: "Termos obrigatórios",
        description: "Você deve aceitar os termos de uso para continuar.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "🎉 Conta criada com sucesso!",
      description: `Bem-vindo(a), ${registerData.firstName}! Sua conta foi criada.`,
    })

    setTimeout(() => {
      setCurrentView("map")
      setIsLoading(false)
    }, 1000)
  }

  const renderStars = (rating: number, interactive = false) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            } ${interactive ? "cursor-pointer hover:scale-110 transition-transform" : ""}`}
            onClick={interactive ? () => setSelectedRating(star) : undefined}
          />
        ))}
      </div>
    )
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "🎉 Login realizado com sucesso!",
      description: `Bem-vindo(a) de volta!`,
    })

    setTimeout(() => {
      setCurrentView("map")
      setIsLoading(false)
    }, 1000)
  }

  if (currentView === "login") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-gray-600 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-gray-500 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-32 w-12 h-12 bg-gray-400 rounded-full animate-pulse delay-2000"></div>
        </div>

        <Card className="w-full max-w-md backdrop-blur-sm bg-white/95 shadow-2xl border-0">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Wheelchair className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                Mapa Acessível
              </h1>
              <p className="text-gray-600 mt-2">Conectando pessoas a lugares acessíveis</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input id="email" type="email" placeholder="Digite seu e-mail" className="pl-10 h-12" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite sua senha"
                    className="pl-10 pr-10 h-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <span className="flex items-center gap-2">
                    Entrar <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </Button>

              <div className="flex justify-between items-center text-sm">
                <button
                  type="button"
                  onClick={() => setCurrentView("register")}
                  className="text-gray-600 hover:text-gray-800 font-medium flex items-center gap-1"
                >
                  <UserPlus className="w-4 h-4" />
                  Criar conta
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentView("recovery")}
                  className="text-gray-500 hover:text-gray-700 flex items-center gap-1"
                >
                  <Key className="w-4 h-4" />
                  Esqueci a senha
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (currentView === "register") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-gray-600 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-gray-500 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-32 w-12 h-12 bg-gray-400 rounded-full animate-pulse delay-2000"></div>
        </div>

        <Card className="w-full max-w-3xl backdrop-blur-sm bg-white/95 shadow-2xl border-0 max-h-[95vh] overflow-y-auto">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-pulse">
                <UserPlus className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                Criar Conta
              </h1>
              <p className="text-gray-600 mt-2">Junte-se à nossa comunidade inclusiva</p>

              <div className="flex items-center justify-center mt-6 space-x-2">
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      registerStep >= 1 ? "bg-gray-600 text-white" : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {registerStep > 1 ? <Check className="w-4 h-4" /> : "1"}
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-600">Dados Pessoais</span>
                </div>
                <div
                  className={`w-8 h-1 rounded transition-all ${registerStep >= 2 ? "bg-gray-600" : "bg-gray-200"}`}
                ></div>
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      registerStep >= 2 ? "bg-gray-600 text-white" : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {registerStep > 2 ? <Check className="w-4 h-4" /> : "2"}
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-600">Necessidades</span>
                </div>
                <div
                  className={`w-8 h-1 rounded transition-all ${registerStep >= 3 ? "bg-gray-600" : "bg-gray-200"}`}
                ></div>
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      registerStep >= 3 ? "bg-gray-600 text-white" : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {registerStep > 3 ? <Check className="w-4 h-4" /> : "3"}
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-600">Confirmação</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleRegister} className="space-y-6">
              {registerStep === 1 && (
                <div className="space-y-6 animate-in slide-in-from-right-5 duration-300">
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">Vamos começar com seus dados</h2>
                    <p className="text-gray-600 text-sm mt-1">Precisamos de algumas informações básicas</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Nome *</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <Input
                          id="firstName"
                          placeholder="Seu primeiro nome"
                          className={`pl-10 h-12 transition-all ${
                            registerData.firstName && registerData.firstName.length >= 2
                              ? "border-gray-600 focus:border-gray-600"
                              : registerData.firstName && registerData.firstName.length > 0
                                ? "border-red-500 focus:border-red-500"
                                : ""
                          }`}
                          value={registerData.firstName}
                          onChange={(e) => setRegisterData((prev) => ({ ...prev, firstName: e.target.value }))}
                          required
                        />
                        {registerData.firstName && registerData.firstName.length >= 2 && (
                          <CheckCircle className="absolute right-3 top-3 w-4 h-4 text-gray-600" />
                        )}
                      </div>
                      {registerData.firstName &&
                        registerData.firstName.length > 0 &&
                        registerData.firstName.length < 2 && (
                          <p className="text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            Nome deve ter pelo menos 2 caracteres
                          </p>
                        )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName">Sobrenome *</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <Input
                          id="lastName"
                          placeholder="Seu sobrenome"
                          className={`pl-10 h-12 transition-all ${
                            registerData.lastName && registerData.lastName.length >= 2
                              ? "border-gray-600 focus:border-gray-600"
                              : registerData.lastName && registerData.lastName.length > 0
                                ? "border-red-500 focus:border-red-500"
                                : ""
                          }`}
                          value={registerData.lastName}
                          onChange={(e) => setRegisterData((prev) => ({ ...prev, lastName: e.target.value }))}
                          required
                        />
                        {registerData.lastName && registerData.lastName.length >= 2 && (
                          <CheckCircle className="absolute right-3 top-3 w-4 h-4 text-gray-600" />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-email">E-mail *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="seu.email@exemplo.com"
                        className={`pl-10 h-12 transition-all ${
                          registerData.email && isValidEmail(registerData.email)
                            ? "border-gray-600 focus:border-gray-600"
                            : registerData.email && registerData.email.length > 0
                              ? "border-red-500 focus:border-red-500"
                              : ""
                        }`}
                        value={registerData.email}
                        onChange={(e) => setRegisterData((prev) => ({ ...prev, email: e.target.value }))}
                        required
                      />
                      {registerData.email && isValidEmail(registerData.email) && (
                        <CheckCircle className="absolute right-3 top-3 w-4 h-4 text-gray-600" />
                      )}
                    </div>
                    {registerData.email && registerData.email.length > 0 && !isValidEmail(registerData.email) && (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        Digite um e-mail válido
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-password">Senha *</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        id="register-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Crie uma senha segura"
                        className={`pl-10 pr-10 h-12 transition-all ${
                          registerData.password && getPasswordStrength(registerData.password) >= 80
                            ? "border-gray-600 focus:border-gray-600"
                            : registerData.password && registerData.password.length > 0
                              ? "border-yellow-500 focus:border-yellow-500"
                              : ""
                        }`}
                        value={registerData.password}
                        onChange={(e) => setRegisterData((prev) => ({ ...prev, password: e.target.value }))}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {registerData.password && (
                      <div className="space-y-2">
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all duration-300 ${
                              getPasswordStrength(registerData.password) >= 80
                                ? "bg-gray-600"
                                : getPasswordStrength(registerData.password) >= 60
                                  ? "bg-yellow-500"
                                  : getPasswordStrength(registerData.password) >= 40
                                    ? "bg-orange-500"
                                    : "bg-red-500"
                            }`}
                            style={{ width: `${getPasswordStrength(registerData.password)}%` }}
                          ></div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div
                            className={`flex items-center gap-1 ${registerData.password.length >= 8 ? "text-gray-600" : "text-gray-400"}`}
                          >
                            {registerData.password.length >= 8 ? (
                              <CheckCircle className="w-3 h-3" />
                            ) : (
                              <AlertCircle className="w-3 h-3" />
                            )}
                            8+ caracteres
                          </div>
                          <div
                            className={`flex items-center gap-1 ${/[A-Z]/.test(registerData.password) ? "text-gray-600" : "text-gray-400"}`}
                          >
                            {/[A-Z]/.test(registerData.password) ? (
                              <CheckCircle className="w-3 h-3" />
                            ) : (
                              <AlertCircle className="w-3 h-3" />
                            )}
                            Letra maiúscula
                          </div>
                          <div
                            className={`flex items-center gap-1 ${/[0-9]/.test(registerData.password) ? "text-gray-600" : "text-gray-400"}`}
                          >
                            {/[0-9]/.test(registerData.password) ? (
                              <CheckCircle className="w-3 h-3" />
                            ) : (
                              <AlertCircle className="w-3 h-3" />
                            )}
                            Número
                          </div>
                          <div
                            className={`flex items-center gap-1 ${/[^A-Za-z0-9]/.test(registerData.password) ? "text-gray-600" : "text-gray-400"}`}
                          >
                            {/[^A-Za-z0-9]/.test(registerData.password) ? (
                              <CheckCircle className="w-3 h-3" />
                            ) : (
                              <AlertCircle className="w-3 h-3" />
                            )}
                            Símbolo especial
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar Senha *</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Digite a senha novamente"
                        className={`pl-10 pr-10 h-12 transition-all ${
                          registerData.confirmPassword && registerData.password === registerData.confirmPassword
                            ? "border-gray-600 focus:border-gray-600"
                            : registerData.confirmPassword && registerData.confirmPassword.length > 0
                              ? "border-red-500 focus:border-red-500"
                              : ""
                        }`}
                        value={registerData.confirmPassword}
                        onChange={(e) => setRegisterData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {registerData.confirmPassword && registerData.password !== registerData.confirmPassword && (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        As senhas não coincidem
                      </p>
                    )}
                    {registerData.confirmPassword && registerData.password === registerData.confirmPassword && (
                      <p className="text-xs text-gray-600 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Senhas coincidem
                      </p>
                    )}
                  </div>

                  <Button
                    type="button"
                    onClick={() => {
                      if (canProceedToStep2()) {
                        setRegisterStep(2)
                      } else {
                        toast({
                          title: "Campos obrigatórios",
                          description: "Por favor, preencha todos os campos corretamente antes de continuar.",
                          variant: "destructive",
                        })
                      }
                    }}
                    className="w-full h-12 bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    disabled={!canProceedToStep2()}
                  >
                    <span className="flex items-center gap-2">
                      Continuar <ArrowRight className="w-4 h-4" />
                    </span>
                  </Button>
                </div>
              )}

              {registerStep === 2 && (
                <div className="space-y-6 animate-in slide-in-from-right-5 duration-300">
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">Suas necessidades específicas</h2>
                    <p className="text-gray-600 text-sm mt-1">
                      Isso nos ajuda a personalizar sua experiência (opcional)
                    </p>
                  </div>

                  <div className="space-y-4">
                    <Label className="flex items-center gap-2 text-base">
                      <Heart className="w-5 h-5 text-gray-600" />
                      Selecione suas necessidades específicas
                    </Label>
                    <p className="text-sm text-gray-600 mb-4">
                      Essas informações nos ajudam a destacar locais mais relevantes para você. Você pode pular esta
                      etapa e configurar depois.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {necessidades.map((necessidade) => {
                        const IconComponent = necessidade.icon
                        const isSelected = selectedNeeds.includes(necessidade.value)
                        return (
                          <div
                            key={necessidade.value}
                            className={`flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                              isSelected
                                ? "border-gray-600 bg-gray-50 shadow-md transform scale-105"
                                : "border-gray-200 hover:border-gray-400 hover:bg-gray-50"
                            }`}
                            onClick={() => toggleNeed(necessidade.value)}
                          >
                            <div
                              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                                isSelected ? "border-gray-600 bg-gray-600" : "border-gray-300"
                              }`}
                            >
                              {isSelected && <Check className="w-4 h-4 text-white" />}
                            </div>
                            <IconComponent
                              className={`w-5 h-5 transition-colors ${isSelected ? "text-gray-700" : "text-gray-500"}`}
                            />
                            <Label className="text-sm font-medium cursor-pointer flex-1">{necessidade.label}</Label>
                          </div>
                        )
                      })}
                    </div>

                    {selectedNeeds.length > 0 && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-800 font-medium mb-2">
                          Necessidades selecionadas ({selectedNeeds.length}):
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {selectedNeeds.map((need) => {
                            const necessidade = necessidades.find((n) => n.value === need)
                            return (
                              <Badge key={need} variant="secondary" className="bg-gray-200 text-gray-800">
                                {necessidade?.label}
                              </Badge>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <Button type="button" variant="outline" onClick={() => setRegisterStep(1)} className="flex-1 h-12">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Voltar
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setRegisterStep(3)}
                      className="flex-1 h-12 bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900"
                    >
                      <span className="flex items-center gap-2">
                        Continuar <ArrowRight className="w-4 h-4" />
                      </span>
                    </Button>
                  </div>
                </div>
              )}

              {registerStep === 3 && (
                <div className="space-y-6 animate-in slide-in-from-right-5 duration-300">
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">Confirme seus dados</h2>
                    <p className="text-gray-600 text-sm mt-1">Revise as informações antes de criar sua conta</p>
                  </div>

                  <div className="space-y-4">
                    <Card className="p-4 bg-gray-50">
                      <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Dados Pessoais
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Nome:</span>
                          <span className="font-medium">
                            {registerData.firstName} {registerData.lastName}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">E-mail:</span>
                          <span className="font-medium">{registerData.email}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Senha:</span>
                          <span className="font-medium">••••••••</span>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-4 bg-gray-50">
                      <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <Heart className="w-4 h-4 text-gray-600" />
                        Necessidades Específicas
                      </h3>
                      {selectedNeeds.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {selectedNeeds.map((need) => {
                            const necessidade = necessidades.find((n) => n.value === need)
                            const IconComponent = necessidade?.icon || User
                            return (
                              <Badge key={need} variant="secondary" className="flex items-center gap-1">
                                <IconComponent className="w-3 h-3" />
                                {necessidade?.label}
                              </Badge>
                            )
                          })}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-600">Nenhuma necessidade específica selecionada</p>
                      )}
                    </Card>

                    <div className="flex items-start space-x-3 p-4 border border-gray-300 rounded-lg bg-gray-50">
                      <Checkbox id="terms" checked={acceptTerms} onCheckedChange={setAcceptTerms} className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor="terms" className="text-sm font-medium cursor-pointer">
                          Aceito os termos de uso e política de privacidade
                        </Label>
                        <p className="text-xs text-gray-600 mt-1">
                          Ao criar sua conta, você concorda com nossos{" "}
                          <a href="#" className="text-gray-700 hover:underline">
                            termos de uso
                          </a>{" "}
                          e{" "}
                          <a href="#" className="text-gray-700 hover:underline">
                            política de privacidade
                          </a>
                          .
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button type="button" variant="outline" onClick={() => setRegisterStep(2)} className="flex-1 h-12">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Voltar
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 h-12 bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                      disabled={isLoading || !acceptTerms}
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      ) : (
                        <span className="flex items-center gap-2">
                          Criar Conta <Check className="w-4 h-4" />
                        </span>
                      )}
                    </Button>
                  </div>
                </div>
              )}

              <div className="text-center pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setCurrentView("login")}
                  className="text-gray-600 hover:text-gray-700 font-medium flex items-center gap-1 mx-auto transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Já tenho conta
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (currentView === "recovery") {
    const sendVerificationCode = async () => {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const code = Math.floor(100000 + Math.random() * 900000).toString()
      setSentCode(code)

      setCodeTimer(60)
      const timer = setInterval(() => {
        setCodeTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)

      setIsLoading(false)
      setRecoveryStep(2)

      toast({
        title: "Código enviado!",
        description: `Código de verificação enviado para ${recoveryData.email}. (Código: ${code} - apenas para demonstração)`,
        duration: 8000,
      })
    }

    const resendCode = async () => {
      if (codeTimer > 0) return

      setIsResendingCode(true)
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const newCode = Math.floor(100000 + Math.random() * 900000).toString()
      setSentCode(newCode)
      setCodeTimer(60)

      const timer = setInterval(() => {
        setCodeTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)

      setIsResendingCode(false)

      toast({
        title: "Novo código enviado!",
        description: `Novo código: ${newCode} (apenas para demonstração)`,
        duration: 6000,
      })
    }

    const verifyCode = () => {
      if (recoveryData.verificationCode === sentCode) {
        setRecoveryStep(3)
        toast({
          title: "Código verificado!",
          description: "Agora você pode definir sua nova senha.",
        })
      } else {
        toast({
          title: "Código incorreto",
          description: "Verifique o código e tente novamente.",
          variant: "destructive",
        })
      }
    }

    const resetPassword = async (e: React.FormEvent) => {
      e.preventDefault()

      if (recoveryData.newPassword !== recoveryData.confirmPassword) {
        toast({
          title: "Senhas não coincidem",
          description: "As senhas devem ser idênticas.",
          variant: "destructive",
        })
        return
      }

      if (getPasswordStrength(recoveryData.newPassword) < 80) {
        toast({
          title: "Senha muito fraca",
          description: "Sua senha deve atender a todos os critérios de segurança.",
          variant: "destructive",
        })
        return
      }

      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setIsLoading(false)

      toast({
        title: "🎉 Senha redefinida com sucesso!",
        description: "Sua senha foi alterada. Você pode fazer login agora.",
      })

      setRecoveryStep(1)
      setRecoveryData({
        email: "",
        verificationCode: "",
        newPassword: "",
        confirmPassword: "",
      })
      setSentCode("")
      setCodeTimer(0)

      setTimeout(() => {
        setCurrentView("login")
      }, 2000)
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-gray-600 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-gray-500 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-32 w-12 h-12 bg-gray-400 rounded-full animate-pulse delay-2000"></div>
        </div>

        <Card className="w-full max-w-2xl backdrop-blur-sm bg-white/95 shadow-2xl border-0 max-h-[95vh] overflow-y-auto">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-pulse">
                <Key className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                Recuperar Senha
              </h1>
              <p className="text-gray-600 mt-2">Siga os passos para redefinir sua senha</p>

              <div className="flex items-center justify-center mt-6 space-x-2">
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      recoveryStep >= 1 ? "bg-gray-600 text-white" : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {recoveryStep > 1 ? <Check className="w-4 h-4" /> : "1"}
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-600">E-mail</span>
                </div>
                <div
                  className={`w-8 h-1 rounded transition-all ${recoveryStep >= 2 ? "bg-gray-600" : "bg-gray-200"}`}
                ></div>
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      recoveryStep >= 2 ? "bg-gray-600 text-white" : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {recoveryStep > 2 ? <Check className="w-4 h-4" /> : "2"}
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-600">Verificação</span>
                </div>
                <div
                  className={`w-8 h-1 rounded transition-all ${recoveryStep >= 3 ? "bg-gray-600" : "bg-gray-200"}`}
                ></div>
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      recoveryStep >= 3 ? "bg-gray-600 text-white" : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {recoveryStep > 3 ? <Check className="w-4 h-4" /> : "3"}
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-600">Nova Senha</span>
                </div>
              </div>
            </div>

            {recoveryStep === 1 && (
              <div className="space-y-6 animate-in slide-in-from-right-5 duration-300">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">Digite seu e-mail</h2>
                  <p className="text-gray-600 text-sm mt-1">Enviaremos um código de verificação para seu e-mail</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="recovery-email">E-mail *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="recovery-email"
                      type="email"
                      placeholder="Digite seu e-mail cadastrado"
                      className={`pl-10 h-12 transition-all ${
                        recoveryData.email && isValidEmail(recoveryData.email)
                          ? "border-gray-600 focus:border-gray-600"
                          : recoveryData.email && recoveryData.email.length > 0
                            ? "border-red-500 focus:border-red-500"
                            : ""
                      }`}
                      value={recoveryData.email}
                      onChange={(e) => setRecoveryData((prev) => ({ ...prev, email: e.target.value }))}
                      required
                    />
                    {recoveryData.email && isValidEmail(recoveryData.email) && (
                      <CheckCircle className="absolute right-3 top-3 w-4 h-4 text-gray-600" />
                    )}
                  </div>
                  {recoveryData.email && recoveryData.email.length > 0 && !isValidEmail(recoveryData.email) && (
                    <p className="text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      Digite um e-mail válido
                    </p>
                  )}
                </div>

                <Button
                  onClick={sendVerificationCode}
                  className="w-full h-12 bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  disabled={isLoading || !isValidEmail(recoveryData.email)}
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <span className="flex items-center gap-2">
                      Enviar Código <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                </Button>
              </div>
            )}

            {recoveryStep === 2 && (
              <div className="space-y-6 animate-in slide-in-from-right-5 duration-300">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">Digite o código de verificação</h2>
                  <p className="text-gray-600 text-sm mt-1">
                    Enviamos um código de 6 dígitos para <strong>{recoveryData.email}</strong>
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="verification-code">Código de Verificação *</Label>
                  <div className="relative">
                    <MessageCircle className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="verification-code"
                      type="text"
                      placeholder="000000"
                      maxLength={6}
                      className={`pl-10 h-12 text-center text-2xl font-mono tracking-widest transition-all ${
                        recoveryData.verificationCode.length === 6 ? "border-gray-600 focus:border-gray-600" : ""
                      }`}
                      value={recoveryData.verificationCode}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "").slice(0, 6)
                        setRecoveryData((prev) => ({ ...prev, verificationCode: value }))
                      }}
                      required
                    />
                    {recoveryData.verificationCode.length === 6 && (
                      <CheckCircle className="absolute right-3 top-3 w-4 h-4 text-gray-600" />
                    )}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{recoveryData.verificationCode.length}/6 dígitos</span>
                    {codeTimer > 0 ? (
                      <span className="text-gray-500">Reenviar em {codeTimer}s</span>
                    ) : (
                      <button
                        onClick={resendCode}
                        disabled={isResendingCode}
                        className="text-gray-600 hover:text-gray-800 font-medium flex items-center gap-1"
                      >
                        {isResendingCode ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          <RotateCcw className="w-3 h-3" />
                        )}
                        Reenviar código
                      </button>
                    )}
                  </div>
                </div>

                {sentCode && (
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="flex items-center gap-2 text-amber-800">
                      <AlertCircle className="w-4 h-4" />
                      <span className="font-medium">Apenas para demonstração:</span>
                    </div>
                    <p className="text-amber-700 text-sm mt-1">
                      Código enviado: <strong className="font-mono text-lg">{sentCode}</strong>
                    </p>
                  </div>
                )}

                <div className="flex gap-3">
                  <Button type="button" variant="outline" onClick={() => setRecoveryStep(1)} className="flex-1 h-12">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Voltar
                  </Button>
                  <Button
                    onClick={verifyCode}
                    className="flex-1 h-12 bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900"
                    disabled={recoveryData.verificationCode.length !== 6}
                  >
                    <span className="flex items-center gap-2">
                      Verificar <ArrowRight className="w-4 h-4" />
                    </span>
                  </Button>
                </div>
              </div>
            )}

            {recoveryStep === 3 && (
              <div className="space-y-6 animate-in slide-in-from-right-5 duration-300">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">Defina sua nova senha</h2>
                  <p className="text-gray-600 text-sm mt-1">Crie uma senha forte e segura para sua conta</p>
                </div>

                <form onSubmit={resetPassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-password">Nova Senha *</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        id="new-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Digite sua nova senha"
                        className={`pl-10 pr-10 h-12 transition-all ${
                          recoveryData.newPassword && getPasswordStrength(recoveryData.newPassword) >= 80
                            ? "border-gray-600 focus:border-gray-600"
                            : recoveryData.newPassword && recoveryData.newPassword.length > 0
                              ? "border-yellow-500 focus:border-yellow-500"
                              : ""
                        }`}
                        value={recoveryData.newPassword}
                        onChange={(e) => setRecoveryData((prev) => ({ ...prev, newPassword: e.target.value }))}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {recoveryData.newPassword && (
                      <div className="space-y-2">
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all duration-300 ${
                              getPasswordStrength(recoveryData.newPassword) >= 80
                                ? "bg-gray-600"
                                : getPasswordStrength(recoveryData.newPassword) >= 60
                                  ? "bg-yellow-500"
                                  : getPasswordStrength(recoveryData.newPassword) >= 40
                                    ? "bg-orange-500"
                                    : "bg-red-500"
                            }`}
                            style={{ width: `${getPasswordStrength(recoveryData.newPassword)}%` }}
                          ></div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div
                            className={`flex items-center gap-1 ${recoveryData.newPassword.length >= 8 ? "text-gray-600" : "text-gray-400"}`}
                          >
                            {recoveryData.newPassword.length >= 8 ? (
                              <CheckCircle className="w-3 h-3" />
                            ) : (
                              <AlertCircle className="w-3 h-3" />
                            )}
                            8+ caracteres
                          </div>
                          <div
                            className={`flex items-center gap-1 ${/[A-Z]/.test(recoveryData.newPassword) ? "text-gray-600" : "text-gray-400"}`}
                          >
                            {/[A-Z]/.test(recoveryData.newPassword) ? (
                              <CheckCircle className="w-3 h-3" />
                            ) : (
                              <AlertCircle className="w-3 h-3" />
                            )}
                            Letra maiúscula
                          </div>
                          <div
                            className={`flex items-center gap-1 ${/[0-9]/.test(recoveryData.newPassword) ? "text-gray-600" : "text-gray-400"}`}
                          >
                            {/[0-9]/.test(recoveryData.newPassword) ? (
                              <CheckCircle className="w-3 h-3" />
                            ) : (
                              <AlertCircle className="w-3 h-3" />
                            )}
                            Número
                          </div>
                          <div
                            className={`flex items-center gap-1 ${/[^A-Za-z0-9]/.test(recoveryData.newPassword) ? "text-gray-600" : "text-gray-400"}`}
                          >
                            {/[^A-Za-z0-9]/.test(recoveryData.newPassword) ? (
                              <CheckCircle className="w-3 h-3" />
                            ) : (
                              <AlertCircle className="w-3 h-3" />
                            )}
                            Símbolo especial
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-new-password">Confirmar Nova Senha *</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        id="confirm-new-password"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Digite a senha novamente"
                        className={`pl-10 pr-10 h-12 transition-all ${
                          recoveryData.confirmPassword && recoveryData.newPassword === recoveryData.confirmPassword
                            ? "border-gray-600 focus:border-gray-600"
                            : recoveryData.confirmPassword && recoveryData.confirmPassword.length > 0
                              ? "border-red-500 focus:border-red-500"
                              : ""
                        }`}
                        value={recoveryData.confirmPassword}
                        onChange={(e) => setRecoveryData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {recoveryData.confirmPassword && recoveryData.newPassword !== recoveryData.confirmPassword && (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        As senhas não coincidem
                      </p>
                    )}
                    {recoveryData.confirmPassword && recoveryData.newPassword === recoveryData.confirmPassword && (
                      <p className="text-xs text-gray-600 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Senhas coincidem
                      </p>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <Button type="button" variant="outline" onClick={() => setRecoveryStep(2)} className="flex-1 h-12">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Voltar
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 h-12 bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                      disabled={
                        isLoading ||
                        getPasswordStrength(recoveryData.newPassword) < 80 ||
                        recoveryData.newPassword !== recoveryData.confirmPassword
                      }
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      ) : (
                        <span className="flex items-center gap-2">
                          Redefinir Senha <Check className="w-4 h-4" />
                        </span>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            )}

            <div className="text-center pt-4 border-t">
              <button
                type="button"
                onClick={() => {
                  setCurrentView("login")
                  setRecoveryStep(1)
                  setRecoveryData({
                    email: "",
                    verificationCode: "",
                    newPassword: "",
                    confirmPassword: "",
                  })
                  setSentCode("")
                  setCodeTimer(0)
                }}
                className="text-gray-600 hover:text-gray-700 font-medium flex items-center gap-1 mx-auto transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar ao login
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (currentView === "map") {
    const handleFilterToggle = (type: string) => {
      setActiveFilters((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
    }

    const clearAllFilters = () => {
      setActiveFilters([])
    }

    const handleKeyPress = (e: any, callback: () => void) => {
      if (e.key === "Enter") {
        callback()
      }
    }

    const filteredLocations = getFilteredLocations()

    return (
      <div className="h-screen flex flex-col bg-gray-50">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 shadow-sm">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden">
              <Menu className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                Mapa Acessível
              </h1>
            </div>
          </div>

          <div className="flex-1 max-w-2xl mx-8 relative">
            <div className="flex items-center bg-gray-100 rounded-full p-1 shadow-sm">
              <Search className="absolute left-4 w-4 h-4 text-gray-400 z-10" />
              <Input
                placeholder="Pesquisar locais, tipos de acessibilidade, endereços..."
                className="pl-12 pr-32 border-0 bg-transparent focus:ring-0 h-10"
                value={searchTerm}
                onChange={(e) => handleSearchInputChange(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, handleGlobalSearch)}
                onFocus={() => {
                  if (searchTerm.length >= 2) {
                    setShowSuggestions(true)
                  }
                }}
              />

              <div className="absolute right-1 flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
                  className={`rounded-full h-8 w-8 p-0 ${showAdvancedSearch ? "bg-gray-200 text-gray-700" : ""}`}
                  title="Pesquisa avançada"
                >
                  <Filter className="w-3 h-3" />
                </Button>

                <Button
                  size="sm"
                  className="rounded-full bg-gray-600 hover:bg-gray-700 h-8 px-3"
                  onClick={handleGlobalSearch}
                  disabled={isSearching}
                >
                  {isSearching ? <Loader2 className="w-3 h-3 animate-spin" /> : <Search className="w-3 h-3" />}
                </Button>
              </div>
            </div>

            {showSuggestions && searchSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-80 overflow-y-auto">
                {searchSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionSelect(suggestion)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 border-b border-gray-100 last:border-b-0"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        suggestion.type === "location"
                          ? "bg-gray-100 text-gray-600"
                          : suggestion.type === "accessibility"
                            ? "bg-gray-200 text-gray-700"
                            : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {suggestion.type === "location" ? (
                        <MapPin className="w-4 h-4" />
                      ) : suggestion.type === "accessibility" ? (
                        <Accessibility className="w-4 h-4" />
                      ) : (
                        <Navigation className="w-4 h-4" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{suggestion.text}</p>
                      <p className="text-sm text-gray-500 truncate">{suggestion.subtitle}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {!showSuggestions && searchHistory.length > 0 && searchTerm.length === 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-3 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Pesquisas recentes</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSearchHistory([])
                        localStorage.removeItem("searchHistory")
                      }}
                      className="text-xs text-gray-500 hover:text-gray-700"
                    >
                      <RotateCcw className="w-3 h-3 mr-1" />
                      Limpar
                    </Button>
                  </div>
                </div>
                <div className="max-h-48 overflow-y-auto">
                  {searchHistory.slice(0, 6).map((term, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSearchTerm(term)
                        handleGlobalSearch()
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3"
                    >
                      <Search className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-700">{term}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback className="bg-gradient-to-br from-gray-600 to-gray-800 text-white">U</AvatarFallback>
            </Avatar>
            <span className="hidden md:inline font-medium">Usuário</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentView("login")}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </header>

        {showAdvancedSearch && (
          <div className="bg-white border-b border-gray-200 px-4 py-3">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-800">Filtros Avançados</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setAdvancedSearchFilters({
                      minRating: 0,
                      maxDistance: 10,
                      hasDescription: false,
                      accessibilityCount: 0,
                    })
                  }}
                  className="text-xs text-gray-500"
                >
                  <RotateCcw className="w-3 h-3 mr-1" />
                  Limpar filtros
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">Avaliação mínima</Label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setAdvancedSearchFilters((prev) => ({ ...prev, minRating: rating }))}
                        className={`p-1 rounded ${
                          advancedSearchFilters.minRating >= rating ? "text-yellow-400" : "text-gray-300"
                        }`}
                      >
                        <Star className="w-4 h-4 fill-current" />
                      </button>
                    ))}
                    <span className="text-xs text-gray-500 ml-2">
                      {advancedSearchFilters.minRating > 0 ? `${advancedSearchFilters.minRating}+` : "Todas"}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm">Tipos de acessibilidade</Label>
                  <div className="flex items-center gap-2">
                    <Button
                      variant={advancedSearchFilters.accessibilityCount === 0 ? "default" : "outline"}
                      size="sm"
                      onClick={() => setAdvancedSearchFilters((prev) => ({ ...prev, accessibilityCount: 0 }))}
                      className="text-xs"
                    >
                      Todos
                    </Button>
                    <Button
                      variant={advancedSearchFilters.accessibilityCount === 2 ? "default" : "outline"}
                      size="sm"
                      onClick={() => setAdvancedSearchFilters((prev) => ({ ...prev, accessibilityCount: 2 }))}
                      className="text-xs"
                    >
                      2+
                    </Button>
                    <Button
                      variant={advancedSearchFilters.accessibilityCount === 3 ? "default" : "outline"}
                      size="sm"
                      onClick={() => setAdvancedSearchFilters((prev) => ({ ...prev, accessibilityCount: 3 }))}
                      className="text-xs"
                    >
                      3+
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm">Conteúdo</Label>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hasDescription"
                      checked={advancedSearchFilters.hasDescription}
                      onCheckedChange={(checked) =>
                        setAdvancedSearchFilters((prev) => ({ ...prev, hasDescription: checked as boolean }))
                      }
                    />
                    <Label htmlFor="hasDescription" className="text-xs">
                      Com descrição
                    </Label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm">Resultados</Label>
                  <div className="text-xs text-gray-600">
                    <p>{getFilteredLocations().length} locais encontrados</p>
                    <p>{locations.length} total disponível</p>
                  </div>
                </div>
              </div>

              {(activeFilters.length > 0 || searchResults.length > 0) && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {searchResults.length > 0 && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Search className="w-3 h-3" />
                      {searchResults.length} resultado(s) para "{searchTerm}"
                      <button
                        onClick={() => {
                          setSearchResults([])
                          setSearchTerm("")
                          setFilterTerm("")
                        }}
                        className="ml-1 hover:text-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  )}

                  {activeFilters.map((filter) => {
                    const tipo = tiposAcessibilidade.find((t) => t.value === filter)
                    const IconComponent = AccessibilityIcons[filter as keyof typeof AccessibilityIcons]
                    return (
                      <Badge key={filter} variant="secondary" className="flex items-center gap-1">
                        <IconComponent className="w-3 h-3" color={tipo?.color} />
                        {tipo?.label.replace(/^.+?\s/, "")}
                        <button onClick={() => handleFilterToggle(filter)} className="ml-1 hover:text-red-600">
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        <div className={`flex-1 flex overflow-hidden ${showAdvancedSearch ? "h-[calc(100vh-16rem)]" : ""}`}>
          <div
            className={`w-96 bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
            } ${sidebarOpen ? "" : "lg:w-0 lg:border-r-0"}`}
          >
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              <div>
                <div className="flex items-center gap-2 mb-4 pb-2 border-b">
                  <Plus className="w-5 h-5 text-gray-600" />
                  <h2 className="text-lg font-semibold">Adicionar Local</h2>
                </div>

                <form onSubmit={handleSaveLocation} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="location-name">Nome do Local *</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        id="location-name"
                        placeholder="Nome do local"
                        className="pl-10"
                        value={formData.name}
                        onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location-address">Endereço *</Label>
                    <div className="relative">
                      <Navigation className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        id="location-address"
                        placeholder="Clique no mapa para selecionar"
                        className="pl-10"
                        value={formData.address}
                        onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                        required
                      />
                    </div>
                    {!clickedPosition && (
                      <p className="text-sm text-amber-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        Clique no mapa para selecionar a localização
                      </p>
                    )}
                    {clickedPosition && (
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" />
                        Localização selecionada!
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Accessibility className="w-4 h-4 text-gray-600" />
                      Tipos de Acessibilidade *
                    </Label>
                    <p className="text-sm text-gray-600 mb-3">
                      Selecione todos os tipos de acessibilidade disponíveis neste local
                    </p>

                    <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto border rounded-lg p-3 bg-gray-50">
                      {tiposAcessibilidade.map((tipo) => {
                        const IconComponent = AccessibilityIcons[tipo.value as keyof typeof AccessibilityIcons]
                        const isSelected = selectedAccessibilityTypes.includes(tipo.value)

                        return (
                          <div
                            key={tipo.value}
                            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                              isSelected
                                ? "bg-white border-2 border-gray-400 shadow-sm"
                                : "bg-transparent border-2 border-transparent hover:bg-white hover:shadow-sm"
                            }`}
                            onClick={() => toggleAccessibilityType(tipo.value)}
                          >
                            <div
                              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                                isSelected ? "border-gray-600 bg-gray-600" : "border-gray-300"
                              }`}
                            >
                              {isSelected && <Check className="w-3 h-3 text-white" />}
                            </div>
                            <div
                              className="w-8 h-8 rounded-full flex items-center justify-center"
                              style={{ backgroundColor: `${tipo.color}20` }}
                            >
                              <IconComponent className="w-4 h-4" color={tipo.color} />
                            </div>
                            <div className="flex-1">
                              <span className="text-sm font-medium text-gray-800">
                                {tipo.label.replace(/^.+?\s/, "")}
                              </span>
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    {selectedAccessibilityTypes.length > 0 && (
                      <div className="mt-3 p-3 bg-gray-100 rounded-lg">
                        <p className="text-sm text-gray-800 font-medium mb-2">
                          Selecionados ({selectedAccessibilityTypes.length}):
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {selectedAccessibilityTypes.map((typeValue) => {
                            const tipo = tiposAcessibilidade.find((t) => t.value === typeValue)
                            const IconComponent = AccessibilityIcons[typeValue as keyof typeof AccessibilityIcons]
                            return (
                              <Badge
                                key={typeValue}
                                variant="secondary"
                                className="flex items-center gap-1 bg-white border"
                                style={{ borderColor: tipo?.color, color: tipo?.color }}
                              >
                                <IconComponent className="w-3 h-3" color={tipo?.color} />
                                {tipo?.label.replace(/^.+?\s/, "")}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    toggleAccessibilityType(typeValue)
                                  }}
                                  className="ml-1 hover:text-red-600"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </Badge>
                            )
                          })}
                        </div>
                      </div>
                    )}

                    {selectedAccessibilityTypes.length === 0 && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        Selecione pelo menos um tipo de acessibilidade
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição</Label>
                    <div className="relative">
                      <MessageCircle className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Textarea
                        id="description"
                        placeholder="Descreva os recursos de acessibilidade disponíveis..."
                        className="pl-10 min-h-[80px]"
                        value={formData.description}
                        onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      Avaliação
                    </Label>
                    {renderStars(selectedRating, true)}
                  </div>

                  <div className="space-y-2">
                    <Label>Foto (opcional)</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
                      <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Clique para adicionar uma foto</p>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900"
                    disabled={selectedAccessibilityTypes.length === 0}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Salvar Local
                  </Button>
                </form>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4 pb-2 border-b">
                  <div className="flex items-center gap-2">
                    <List className="w-5 h-5 text-gray-600" />
                    <h2 className="text-lg font-semibold">Locais Cadastrados</h2>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-1"
                  >
                    <Filter className="w-4 h-4" />
                    Filtros
                    {activeFilters.length > 0 && (
                      <Badge variant="secondary" className="ml-1 text-xs">
                        {activeFilters.length}
                      </Badge>
                    )}
                  </Button>
                </div>

                {showFilters && (
                  <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <Label className="text-sm font-medium">Filtrar por tipo:</Label>
                      {activeFilters.length > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={clearAllFilters}
                          className="text-xs text-red-600 hover:text-red-700"
                        >
                          <RotateCcw className="w-3 h-3 mr-1" />
                          Limpar
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {tiposAcessibilidade.map((tipo) => {
                        const IconComponent = AccessibilityIcons[tipo.value as keyof typeof AccessibilityIcons]
                        const isActive = activeFilters.includes(tipo.value)
                        const count = locations.filter((loc) =>
                          (loc.accessibilityTypes || [loc.typeValue]).includes(tipo.value),
                        ).length

                        return (
                          <button
                            key={tipo.value}
                            onClick={() => handleFilterToggle(tipo.value)}
                            className={`flex items-center gap-2 p-2 rounded-lg text-sm transition-all ${
                              isActive
                                ? "bg-gray-200 border-2 border-gray-400 text-gray-800"
                                : "bg-white border border-gray-200 hover:bg-gray-50"
                            }`}
                          >
                            <IconComponent className="w-4 h-4" color={isActive ? "#374151" : tipo.color} />
                            <span className="flex-1 text-left truncate">{tipo.label.replace(/^.+?\s/, "")}</span>
                            <Badge variant="secondary" className="text-xs">
                              {count}
                            </Badge>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}

                <div className="space-y-2 mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Filtrar locais..."
                      className="pl-10"
                      value={filterTerm}
                      onChange={(e) => setFilterTerm(e.target.value)}
                    />
                    {filterTerm && (
                      <button
                        onClick={() => setFilterTerm("")}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  {(activeFilters.length > 0 || filterTerm) && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>
                        Mostrando {filteredLocations.length} de {locations.length} locais
                      </span>
                      {activeFilters.length > 0 && (
                        <div className="flex gap-1">
                          {activeFilters.map((filter) => {
                            const tipo = tiposAcessibilidade.find((t) => t.value === filter)
                            const IconComponent = AccessibilityIcons[filter as keyof typeof AccessibilityIcons]
                            return (
                              <Badge key={filter} variant="secondary" className="flex items-center gap-1 text-xs">
                                <IconComponent className="w-3 h-3" color={tipo?.color} />
                                {tipo?.label.replace(/^.+?\s/, "")}
                                <button onClick={() => handleFilterToggle(filter)} className="ml-1 hover:text-red-600">
                                  <X className="w-3 h-3" />
                                </button>
                              </Badge>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  {filteredLocations.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Search className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p className="font-medium">Nenhum local encontrado</p>
                      <p className="text-sm">
                        {activeFilters.length > 0 || filterTerm
                          ? "Tente ajustar os filtros ou termo de busca"
                          : "Adicione novos locais clicando no mapa"}
                      </p>
                    </div>
                  ) : (
                    filteredLocations.map((location) => {
                      const primaryType = location.accessibilityTypes?.[0] || location.typeValue
                      const IconComponent = AccessibilityIcons[primaryType as keyof typeof AccessibilityIcons]
                      const tipo = tiposAcessibilidade.find((t) => t.value === primaryType)
                      const accessibilityCount = location.accessibilityTypes?.length || 1

                      return (
                        <Card
                          key={location.id}
                          className="cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-[1.02]"
                          onClick={() => handleLocationClick(location)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <div className="relative">
                                <div
                                  className="w-12 h-12 rounded-full flex items-center justify-center shadow-md"
                                  style={{
                                    background: `linear-gradient(135deg, ${tipo?.color}, ${tipo?.color}dd)`,
                                  }}
                                >
                                  <IconComponent className="w-6 h-6" color="white" />
                                </div>
                                {accessibilityCount > 1 && (
                                  <div className="absolute -top-1 -right-1 bg-gray-600 text-white rounded-full w-5 h-5 flex items-center justify-content-center text-xs font-bold">
                                    {accessibilityCount}
                                  </div>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-gray-900 truncate">{location.name}</h3>
                                <p className="text-sm text-gray-600 mb-2 truncate">{location.address}</p>

                                <div className="flex flex-wrap gap-1 mb-2">
                                  {(location.accessibilityTypes || [location.typeValue])
                                    .slice(0, 3)
                                    .map((typeValue) => {
                                      const tipoInfo = tiposAcessibilidade.find((t) => t.value === typeValue)
                                      const TypeIcon = AccessibilityIcons[typeValue as keyof typeof AccessibilityIcons]
                                      return (
                                        <Badge
                                          key={typeValue}
                                          variant="secondary"
                                          className="text-xs flex items-center gap-1 px-2 py-1"
                                          style={{ backgroundColor: `${tipoInfo?.color}20`, color: tipoInfo?.color }}
                                        >
                                          <TypeIcon className="w-3 h-3" color={tipoInfo?.color} />
                                          {tipoInfo?.label.replace(/^.+?\s/, "")}
                                        </Badge>
                                      )
                                    })}
                                  {(location.accessibilityTypes?.length || 0) > 3 && (
                                    <Badge variant="secondary" className="text-xs">
                                      +{(location.accessibilityTypes?.length || 1) - 3}
                                    </Badge>
                                  )}
                                </div>

                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-gray-500">
                                    {accessibilityCount} tipo{accessibilityCount > 1 ? "s" : ""} de acessibilidade
                                  </span>
                                  {location.rating > 0 && (
                                    <div className="flex items-center gap-1">{renderStars(location.rating)}</div>
                                  )}
                                </div>

                                {location.description && (
                                  <p className="text-xs text-gray-500 line-clamp-2 mt-2">{location.description}</p>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 relative bg-gray-100">
            {clickedPosition && (
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white px-4 py-2 rounded-lg z-[1000] flex items-center gap-2 shadow-lg">
                <CheckCircle className="w-4 h-4" />
                <span>Localização selecionada! Preencha o formulário.</span>
              </div>
            )}

            <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 z-[1000] max-w-xs">
              <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <Accessibility className="w-4 h-4 text-gray-600" />
                Tipos de Acessibilidade
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {tiposAcessibilidade.slice(0, 6).map((tipo) => {
                  const IconComponent = AccessibilityIcons[tipo.value as keyof typeof AccessibilityIcons]
                  return (
                    <div key={tipo.value} className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: tipo.color }}
                      >
                        <IconComponent className="w-3 h-3" color="white" />
                      </div>
                      <span className="truncate">{tipo.label.replace(/^.+?\s/, "")}</span>
                    </div>
                  )
                })}
              </div>
              {tiposAcessibilidade.length > 6 && (
                <p className="text-xs text-gray-500 mt-2">+{tiposAcessibilidade.length - 6} outros tipos</p>
              )}
              <div className="mt-3 pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-600">
                  <span className="font-medium">Múltiplas acessibilidades:</span> Locais podem ter vários tipos
                </p>
              </div>
            </div>

            <LeafletMap
              onMapClick={handleMapClick}
              locations={filteredLocations}
              clickedPosition={clickedPosition}
              searchLocation={searchLocation}
            />
          </div>
        </div>
      </div>
    )
  }

  return null
}
