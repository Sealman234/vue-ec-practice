<template>
  <div>
    <div class="container-fluid">
      <Navbar />
      <!-- 使用 Alert 元件 -->
      <Alert></Alert>
      <div class="row">
        <Sidebar></Sidebar>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Alert from "./AlertMessage"; // import

export default {
  components: {
    Navbar,
    Sidebar,
    Alert, // import
  }
};
</script>
