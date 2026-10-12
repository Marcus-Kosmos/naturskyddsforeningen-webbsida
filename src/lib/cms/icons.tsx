import {
  Award,
  Bird,
  BookOpen,
  Calendar,
  Droplets,
  Globe,
  Heart,
  Leaf,
  Lightbulb,
  MapPin,
  MessageCircle,
  Mountain,
  Recycle,
  Shield,
  ShieldCheck,
  ShoppingBag,
  Target,
  Thermometer,
  TreePine,
  Trees,
  Users,
  Wind,
  type LucideIcon,
} from 'lucide-react'

// The icons editors can pick in Studio (studio/schemaTypes/blocks/options.ts).
// An explicit map, rather than `import *`, keeps the bundle small.
const ICONS: Record<string, LucideIcon> = {
  leaf: Leaf,
  trees: Trees,
  'tree-pine': TreePine,
  mountain: Mountain,
  bird: Bird,
  thermometer: Thermometer,
  wind: Wind,
  droplets: Droplets,
  'shopping-bag': ShoppingBag,
  lightbulb: Lightbulb,
  recycle: Recycle,
  award: Award,
  shield: Shield,
  'shield-check': ShieldCheck,
  users: Users,
  heart: Heart,
  target: Target,
  'message-circle': MessageCircle,
  calendar: Calendar,
  globe: Globe,
  'book-open': BookOpen,
  'map-pin': MapPin,
}

export function getIcon(key?: string): LucideIcon | undefined {
  return key ? ICONS[key] : undefined
}
