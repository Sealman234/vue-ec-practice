<template>
  <div>
    <div class="container-fluid">
      <Navbar />
      <div class="row">
        <Sidebar></Sidebar>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
          <!-- main 換成自己的內容 -->
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default {
  components: {
    Navbar,
    Sidebar
  }
};
</script>
