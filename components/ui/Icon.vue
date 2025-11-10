<script setup lang="ts">
// Heroicons
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowsUpDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  IdentificationIcon,
  WrenchScrewdriverIcon,
  TagIcon,
  BoltIcon,
  ClockIcon,
  BuildingStorefrontIcon,
  Squares2X2Icon,
  SparklesIcon,
  CubeIcon,
  BeakerIcon,
} from "@heroicons/vue/24/outline";

// TODO: Add Lucide imports when package is properly installed
// import { Cylinder, Warehouse, Beaker, Flower2, BadgePercent, Boxes } from "lucide-vue-next";

const props = defineProps<{
  name: string;
  size?: number | string; // pixel value, default 20
  class?: string; // pass Tailwind classes
  title?: string; // for a11y tooltip
}>();

// register only explicitly imported icons
const registry: Record<string, any> = {
  // shared
  search: MagnifyingGlassIcon,
  filter: FunnelIcon,
  sort: ArrowsUpDownIcon,
  prev: ChevronLeftIcon,
  next: ChevronRightIcon,
  success: CheckCircleIcon,
  warning: ExclamationTriangleIcon,

  // hydraulics (using heroicons fallbacks for now)
  cylinder: CubeIcon, // fallback until Lucide Cylinder is available
  oem: IdentificationIcon,
  warehouse: BuildingStorefrontIcon, // fallback until Lucide Warehouse is available
  condition: WrenchScrewdriverIcon,
  status: TagIcon,

  // perfumes (using heroicons fallbacks for now)
  brand: BuildingStorefrontIcon,
  volume: BeakerIcon, // fallback until Lucide Beaker is available
  notes: SparklesIcon, // fallback until Lucide Flower2 is available
  notesAlt: SparklesIcon,

  // bargains (using heroicons fallbacks for now)
  discount: TagIcon, // fallback until Lucide BadgePercent is available
  lightning: BoltIcon,
  timer: ClockIcon,
  bundle: Squares2X2Icon, // fallback until Lucide Boxes is available
  bundleAlt: Squares2X2Icon,
};

const IconComp = computed(() => registry[props.name]);
const px = computed(() =>
  typeof props.size === "string" ? props.size : (props.size ?? 20) + "px"
);
</script>

<template>
  <component
    :is="IconComp"
    v-if="IconComp"
    :title="title"
    class="shrink-0"
    :class="props.class"
    :style="{ width: px, height: px }"
    aria-hidden="true"
    focusable="false"
  />
</template>
