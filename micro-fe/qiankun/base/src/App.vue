<template>
  <div id="app">
    <div id="nav">
      <el-menu
        mode="horizontal"
        :router="true"
      >
        <el-menu-item index="/">home</el-menu-item>
        <el-menu-item index="/vue">vue</el-menu-item>
        <el-menu-item index="/react">react</el-menu-item>
      </el-menu>
    </div>
    <router-view/>
    <div id="vue"></div>
    <div id="react"></div>
  </div>
</template>
