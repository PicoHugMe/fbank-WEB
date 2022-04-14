<template>
	<el-container>
		<el-header>
			<el-row>
				<el-col :span="12">
					<img src="../../assets/fang_clear_noword_128.png" alt=""/>
				</el-col>
				<el-col :span="12">
					<el-link type="primary" @click="superGo">平台管理员登录</el-link>
				</el-col>
			</el-row>
		</el-header>
		<el-main class="abccd">
      <div style="width: 600px">
        <el-carousel arrow="never">
          <el-carousel-item >
            <img src="../../assets/pic/合作开发网站.png" alt="">

          </el-carousel-item>
          <el-carousel-item>
            <img src="../../assets/pic/联合工作.png" alt="">
          </el-carousel-item>
        </el-carousel>
      </div>
      <div>
        <router-link to="/logins/login/signin" active-class="go" replace>登录</router-link>
        &nbsp;|&nbsp;
        <router-link to="/logins/login/signup" active-class="go" replace>注册</router-link>
        <router-view></router-view></div>

		</el-main>
		<el-footer style="height: 180px"></el-footer>
	</el-container>
</template>

<script>
export default {
	name: "Login",
	data() {
		return {}
	},
	methods: {
		superGo() {
			this.$router.push({path: '/Welcome'})
		}
	},
	beforeUpdate() {
	},
	mounted() {
		if (window.localStorage.isSuccessed) {
			this.$router.push({path: '/Welcome'})
		}
	},
	beforeDestroy() {
		// console.log('login destory');
	}

}
</script>

<style scoped lang="less">
@import "../../assets/css/Global";

.el-container {
	height: 100%;
}

.el-header {
	width: 100%;
	height: 100px !important;
	text-align: center;
	margin-bottom: 32px;

	.el-col:nth-child(1) {
		height: 100px;

		img {
			width: 100px;
			height: 100px;
		}

		text-align: left;
		padding-left: 50px;
	}

	.el-col:nth-child(2) {
		font-size: 15px;
		text-align: right;
		margin-top: 32px;
		padding-right: 50px;
		color: @brand_color;
	}
}

.el-main {
	padding-top: 40px;
	text-align: center;
	//width: 400px;
	height: 450px;
	background: white;
	margin: 0 auto;
	font-size: 28px;
	font-weight: bold;
	> a {
		text-align: center;
	}

   a:visited,  a:link {
    color: @text_color1;
    background: white;
  }

	> a:hover {
		color: @brand_color;
	}
  >div{
    display: inline-block;
  }
	box-shadow: 0.3px 0 17.7px -8px rgba(0, 0, 0, 0.024),
	0.8px 0px 49px -8px rgba(0, 0, 0, 0.035),
	1.8px 0px 117.9px -8px rgba(0, 0, 0, 0.046),
	6px 0px 391px -8px rgba(0, 0, 0, 0.07);
	border-radius: 8px;
}
.abccd{
  flex: none;
}
.go {
	color: @brand_color !important;
}
</style>
