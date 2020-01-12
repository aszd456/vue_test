<!-- child -->
<template>
	<div class="child">
		<p>我是儿子，父亲对我说： {{give}}</p>
		<a href="javascript:;" rel="external nofollow" @click="returnBackFn">回应</a>
	</div>
</template>
<script>
	export default {
		props: {
			give: String
		},
		methods: {
			returnBackFn() {
				this.$emit('returnBack', '还你200块');
			}
		}
	}
</script>
