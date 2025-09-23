<template>
  <!-- 如果只有一个子节点，直接显示为 el-menu-item -->
  <el-menu-item v-if="item.children?.length === 1" :index="fullPath">
    <el-icon v-if="item.children[0].meta?.icon">
      <component :is="item.children[0].meta.icon" />
    </el-icon>
    <span>{{ item.children[0].meta?.title || item.children[0].name }}</span>
  </el-menu-item>

  <!-- 多个子节点才显示为可展开菜单 -->
  <el-sub-menu
    v-else-if="item.children && item.children.length > 1"
    :index="fullPath"
  >
    <template #title>
      <el-icon v-if="item.meta?.icon">
        <component :is="item.meta.icon" />
      </el-icon>
      <span>{{ item.meta?.title || item.name }}</span>
    </template>

    <SiderItem
      v-for="child in item.children"
      :key="child.path || child.name"
      :item="child"
      :parent-path="fullPath"
    />
  </el-sub-menu>

  <!-- 叶子节点 -->
  <el-menu-item v-else :index="fullPath">
    <el-icon v-if="item.meta?.icon">
      <component :is="item.meta.icon" />
    </el-icon>
    <span>{{ item.meta?.title || item.name }}</span>
  </el-menu-item>
</template>

<script setup>
import { computed } from "vue"
import SiderItem from "./index.vue"

const props = defineProps({
  item: { type: Object, required: true },
  parentPath: { type: String, default: "" }
})

// 拼接完整路径
const fullPath = computed(() => {
  if (!props.item.path) return props.parentPath
  // 如果是绝对路径，直接返回
  if (props.item.path.startsWith("/")) return props.item.path
  // 否则拼接父路径
  return (props.parentPath + "/" + props.item.path).replace(/\/+/g, "/")
})
</script>
