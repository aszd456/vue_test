<template>
	<div id="assign">
		<h2>{{title}}</h2>
		<p>{{obj.profile}}</p>
		<button @click="toggle">toggle</button>
	</div>
</template>

<script>
	export default {
		name: 'Instance',
		data() {
			return {
				title: 'A VUE APP',
				obj: {}
			}
		},
		created() {
			Object.assign(this.obj, {
				profile: 'This is a Vue App'
			})
			console.log('created', this.obj)
		},
		mounted() {
			Object.assign(this.obj,{
				profile:'This is a Vue Test App'
			})
			console.log('mounted', this.obj)
		},
		methods:{
			toggle(){
				Object.assign(this.obj,{
					profile:'This is a Vue App for test'
				})
				console.log('toggle', this.obj)
			}
		}
	}
</script>

<style>
</style>
