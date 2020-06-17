//混入

// 定义一个混入对象
var myMixin = {
	created() {
		this.hello()
	},
	methods: {
		hello() {
			console.log('hello from mixin')
		}
	}
}
// 定义一个使用混入对象的组件
var MyComponent = Vue.extend({
	mixins: [myMixin]
})

var component = new MyComponent()

/**选项合并***/
//当组件和混入对象含有同名选项时，这些选项将以恰当的方式进行“合并”

var mixin = {
	data() {
		return {
			message: 'hello',
			foo: 'abc'
		}
	}
}

new Vue({
	mixins: [mixin],
	data() {
		return {
			message: 'goodbye',
			bar: 'def'
		}
	},
	created(){
		console.log(this.$data)
	}
})
/**
 * 同名钩子函数将合并为一个数组，因此都将被调用
 var mixin = {
   created: function () {
     console.log('混入对象的钩子被调用')
   }
 }
 
 new Vue({
   mixins: [mixin],
   created: function () {
     console.log('组件钩子被调用')
   }
 })
 
 // => "混入对象的钩子被调用"
 // => "组件钩子被调用"
 */

/**
 值为对象的选项，例如 methods、components 和 directives，
 将被合并为同一个对象。两个对象键名冲突时，取组件对象的键值对
 注意：Vue.extend() 也使用同样的策略进行合并。
 var mixin = {
   methods: {
     foo: function () {
       console.log('foo')
     },
     conflicting: function () {
       console.log('from mixin')
     }
   }
 }
 
 var vm = new Vue({
   mixins: [mixin],
   methods: {
     bar: function () {
       console.log('bar')
     },
     conflicting: function () {
       console.log('from self')
     }
   }
 })
 
 vm.foo() // => "foo"
 vm.bar() // => "bar"
 vm.conflicting() // => "from self"
 
 */

/***自定义指令**/

// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus',{
	// 当被绑定的元素插入到 DOM 中时……
	inserted(el){
		// 聚焦元素
		el.focus()
	}
})
//<input v-focus>
/** 局部指令
 directives: {
   focus: {
     // 指令的定义
     inserted: function (el) {
       el.focus()
     }
   }
 }
 */

/**钩子函数***/
