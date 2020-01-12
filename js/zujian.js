/**Prop 类型**/

/**
 * 
 props: ['title', 'likes', 'isPublished', 'commentIds', 'author']
 指定类型
 props: {
   title: String,
   likes: Number,
   isPublished: Boolean,
   commentIds: Array,
   author: Object,
   callback: Function,
   contactsPromise: Promise // or any other constructor
 }
 */

Vue.component('button-counter', {
	props: ['title'],
	data: function() {
		return 0;
	},
	methods: {

	},
	template: '<div><h1>h1...{{title}}</h1></div>'
})

Vue.component('blog-post', {
	// 在 JavaScript 中是 camelCase 的
	props: ['postTitle', 'a'],
	template: '<h3>{{ postTitle +"~by~"+a}}</h3>'
})

var vm = new Vue({
	el: '#app',
	data: {
		a: 'test',
		postTitle: 'hello vue.js'
	},
	methods: {
		clicknow: function(e) {
			console.log(e);
		}
	},
	components: {
		test: {
			template: '<h2>h2...</h2>'
		}
	}
})

Vue.component('base-input', {
	inheritAttrs: false, //禁用特性继承
	props: ['label', 'value'],
	//$attrs 属性 该属性包含了传递给一个组件的特性名和特性值
	template: `
    <label>
      {{ label }}
      <input
        v-bind="$attrs"
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
      >
    </label>
  `
})

new Vue({
	el: '#app2',
	data: {
		username: 'leo',
		label: '用户名'
	}
})


Vue.component('button-counter', {
	template: '<button v-on:click="incrementHandler">{{ counter }}</button>',
	data: function() {
		return {
			counter: 0
		}
	},
	methods: {
		incrementHandler: function() {
			this.counter += 1
			this.$emit('increment')
		}
	},
})
new Vue({
	el: '#counter-event-example',
	data: {
		total: 0
	},
	methods: {
		incrementTotal: function() {
			this.total += 1
		}
	}
})

Vue.component('base-checkbox', {
	model: {
		prop: 'checked',
		event: 'change'
	},
	props: {
		checked: Boolean
	},
	template: `
    <div>checkbox:<input
      type="checkbox"
      v-bind:checked="checked"
      v-on:change="$emit('change', $event.target.checked)"
    ></div>
  `
})

new Vue({
	el: '#model-test',
	data: {
		lovingVue: true
	}
})
/***
		 这里的 lovingVue 的值将会传入这个名为 checked 的 prop。同时当 <base-checkbox> 
		 触发一个 change 事件并附带一个新的值的时候，这个 lovingVue 的属性将会被更新
		 注意：你仍然需要在组件的 props 选项里声明 checked 这个 prop。
**/

Vue.component('custom', {
	template: `<div><button @click='fn'>向父组件传值</button></div>`,
	data: function() {
		return {
			sonMessage: '我是子组件的内容-我来自custom'
		}
	},
	methods: {
		fn: function() {
			this.$emit('input', this.sonMessage)
		}
	}
})

var vueApp = new Vue({
	el: '#customApp',
	data: {
		message: '我其实是一个语法糖'
	}
})

//$listeners它是一个对象，里面包含了作用在这个组件上的所有监听器
/**
 * 有了这个 $listeners 属性，你就可以配合 v-on="$listeners" 将所有的事件监听器指向这个组件的某个特定的子元素。
 * 对于类似 <input> 的你希望它也可以配合 v-model 工作的组件来说，
 * 为这些监听器创建一个类似下述 inputListeners 的计算属性通常是非常有用的
 */
Vue.component('base-input2', {
	inheritAttrs: false,
	props: ['label', 'value'],
	computed: {
		inputListeners: function() {
			var vm = this;
			// `Object.assign` 将所有的对象合并为一个新对象
			return Object.assign({},
				// 我们从父级添加所有的监听器
				this.$listeners,
				// 然后我们添加自定义监听器，
				// 或覆写一些监听器的行为
				{
					// 这里确保组件配合 `v-model` 的工作
					input: function(event) {
						vm.$emit('input', event.target.value)
					}
				})
		}
	},
	template: `,
		<label>
	      {{ label }}
	      <input
	        v-bind="$attrs"
	        v-bind:value="value"
	        v-on="inputListeners"
	      >
	    </label>`
})

new Vue({
	el: '#listen-input',
	data: {
		label: 'name',
		value: 'leo'
	}
})

//  .sync 修饰符

Vue.component('sync-component', {
	template: `<div v-if="show">
                     <p>默认初始值是{{show}}，所以是显示的</p>
                     <button @click.stop="closeDiv">关闭</button>
                  </div>`,
	props: ['show'],
	methods: {
		closeDiv() {
			this.$emit('update:show', false);
		}
	}
})

new Vue({
	el: '#syncDemo',
	data: {
		valueChild: true
	},
	methods: {
		changeValue() {
			this.valueChild = !this.valueChild
		}
	}
})

/**
 <template>
     <div class="details">
         <myComponent :show.sync='valueChild' style="padding: 30px 20px 30px 5px;border:1px solid #ddd;margin-bottom: 10px;"></myComponent>
         <button @click="changeValue">toggle</button>
     </div>
 </template>
 <script>
 import Vue from 'vue'
 Vue.component('myComponent', {
       template: `<div v-if="show">
                     <p>默认初始值是{{show}}，所以是显示的</p>
                     <button @click.stop="closeDiv">关闭</button>
                  </div>`,
       props:['show'],
       methods: {
         closeDiv() {
           this.$emit('update:show', false); //触发 input 事件，并传入新值
         }
       }
 })
 export default{
     data(){
         return{
             valueChild:true,
         }
     },
     methods:{
         changeValue(){
             this.valueChild = !this.valueChild
         }
     }
 }
 </script>
 * 
 * 
 */



Vue.component('base-layout', {
	template: `<div class="container">
			  <header>
				<slot name="header"></slot>
			  </header>
			  <main>
				<slot name="default"></slot>
			  </main>
			  <footer>
				<slot name="footer"></slot>
			  </footer>
			</div>`

})
new Vue({
	el: '#layout-div'
})

Vue.component('current-user', {
	data() {
		return {
			user: {
				lastName: 'zhang',
				firstName: 'yue'
			},
			test: [1, 2, 3, 4]
		}
	},
	template: `
		<span>
		  <slot name='default' :user='user' :test="test" >{{ user.lastName }}--{{test[0]}}</slot>
		</span>
	`
	// {{ user.lastName }}是默认数据  v-slot:todo 当父页面没有(="slotProps")
	// 时显示 Zhang
})
new Vue({
	el: '#current-user-div'
})


Vue.component('todo-list', {
	data() {
		return {
			todoList: [{
				id: 1,
				text: "扫地"
			}, {
				id: 2,
				text: "做饭"
			}, {
				id: 3,
				text: "擦桌子"
			}]
		}
	},
	created() {
		console.log(this.todoList)
	},
	// <!--      我们为每个 todo 准备了一个插槽，      将 `todo(todoList里的)` 
	// 对象作为一个插槽的 prop 传入。      -->
	template: `,
		<ul class="slotTodoChildren">
			<li class="lis" v-for="todo in todoList" v-bind:key="todo.id">
				<slot name="default" :todo="todo">
					{{todo.text}}
				</slot>
			</li>
		</ul>
		`
})

new Vue({
	el: '#v-slot-div',
	methods: {
		type(data) {
			alert(data)
		}
	}
})


//动态组件 & 异步组件

let rxTextboxConfig = Vue.component('rx-textbox-config', {
	props: {
		config: Object
	},
	template: `<div>  我是单行文本框{{config.type}} </div>`
})

let rxTextareaConfig = Vue.component('rx-textarea-config', {
	template: `<div>  我是多行文本框{{config.name}} </div>`,
	props: {
		config: Object
	}
})

new Vue({
	el: '#dt-div',
	data: {
		currentConfig: "",
		ctlType: "rx-textarea",
		config: {}
	},
	components: {
		rxTextboxConfig,
		rxTextareaConfig
	},
	created() {
		this.currentConfig = this.ctlType + "-config";
		if (this.ctlType == "rx-textbox") {
			this.config.type = "VARCHAR";
		}
		if (this.ctlType == "rx-textarea") {
			this.config.name = "我是富文本框";
		}
	}
})


new Vue({
	el: '#dt-div2',
	data: {
		which_to_show: 'first'
	},
	methods: {
		toShow() {
			let arr = ["first", "second", "third"]
			let index = arr.indexOf(this.which_to_show)
			if (index < 2) {
				this.which_to_show = arr[index + 1]
			} else {
				this.which_to_show = arr[0]
			}
		}
	},
	components: {
		first: {
			template: '<div>这是子组件1<div>'
		},
		second: {
			template: '<div>这是子组件2<div>'
		},
		third: {
			template: '<div>这是子组件3<div>'
		}
	}
})

new Vue({
	el: '#dt-div3',
	data: {
		which_to_show: 'first'
	},
	methods: {
		toShow() {
			let arr = ["first", "second", "third"]
			let index = arr.indexOf(this.which_to_show)
			if (index < 2) {
				this.which_to_show = arr[index + 1]
			} else {
				this.which_to_show = arr[0]
			}
			console.log(this.$children);
		}
	},
	components: {
		first: {
			template: '<div>这是子组件1<div>'
		},
		second: {
			template: '<div>这是子组件2<div>'
		},
		third: {
			template: '<div>这是子组件3<div>'
		}
	}
})
/**
 * 
 * 说明：
初始情况下，vm.children属性中只有一个元素（first组件）， 点击按钮切换后，vm.children属性中有两个元素，
再次切换后，则有三个元素（三个子组件都保留在内存中）。
之后无论如何切换，将一直保持有三个元素。
 */

new Vue({
	el: '#dt-div4',
	data: {
		which_to_show: "first"
	},
	methods: {
		toShow: function() { //切换组件显示  
			var arr = ["first", "second", "third", ""];
			var index = arr.indexOf(this.which_to_show);
			if (index < 2) {
				this.which_to_show = arr[index + 1];
			} else {
				this.which_to_show = arr[0];
			}
			console.log(this.$children);
		}
	},

	components: {
		first: { //第一个子组件  
			template: "<div>这里是子组件1</div>"
		},
		second: { //第二个子组件  
			template: "<div>这里是子组件2，这里是延迟后的内容：{{hello}}</div>",
			data: function() {
				return {
					hello: ""
				}
			},
			activated: function(done) { //执行这个参数时，才会切换组件  
				console.log('hhh')
				let self = this;
				let startTime = new Date().getTime(); // get the current time   
				//两秒后执行
				while (new Date().getTime() < startTime + 2000) {
					self.hello = '我是延迟后的内容';
				}

			}
		},
		third: { //第三个子组件  
			template: "<div>这里是子组件3</div>"
		}
	}

});
/**
 * actived钩子
可以延迟执行当前的组件。
具体用法来说，activate是和template、data等属性平级的一个属性，形式是一个函数，函数里默认有一个参数，
而这个参数是一个函数，执行这个函数时，才会切换组件。

 */

Vue.component('tab-posts', {
	data: function() {
		return {
			posts: [{
					id: 1,
					title: 'Cat Ipsum',
					content: '<p>Dont wait for the storm to pass, dance in the rain kick up litter decide to want nothing to do with my owner today demand to be let outside at once, and expect owner to wait for me as i think about it cat cat moo moo lick ears lick paws so make meme, make cute face but lick the other cats. Kitty poochy chase imaginary bugs, but stand in front of the computer screen. Sweet beast cat dog hate mouse eat string barf pillow no baths hate everything stare at guinea pigs. My left donut is missing, as is my right loved it, hated it, loved it, hated it scoot butt on the rug cat not kitten around</p>'
				},
				{
					id: 2,
					title: 'Hipster Ipsum',
					content: '<p>Bushwick blue bottle scenester helvetica ugh, meh four loko. Put a bird on it lumbersexual franzen shabby chic, street art knausgaard trust fund shaman scenester live-edge mixtape taxidermy viral yuccie succulents. Keytar poke bicycle rights, crucifix street art neutra air plant PBR&B hoodie plaid venmo. Tilde swag art party fanny pack vinyl letterpress venmo jean shorts offal mumblecore. Vice blog gentrify mlkshk tattooed occupy snackwave, hoodie craft beer next level migas 8-bit chartreuse. Trust fund food truck drinking vinegar gochujang.</p>'
				},
				{
					id: 3,
					title: 'Cupcake Ipsum',
					content: '<p>Icing dessert soufflé lollipop chocolate bar sweet tart cake chupa chups. Soufflé marzipan jelly beans croissant toffee marzipan cupcake icing fruitcake. Muffin cake pudding soufflé wafer jelly bear claw sesame snaps marshmallow. Marzipan soufflé croissant lemon drops gingerbread sugar plum lemon drops apple pie gummies. Sweet roll donut oat cake toffee cake. Liquorice candy macaroon toffee cookie marzipan.</p>'
				}
			],
			selectedPost: null
		}
	},
	template: `
    <div class="dynamic-component-demo-posts-tab">
      <ul class="dynamic-component-demo-posts-sidebar">
        <li
          v-for="post in posts"
          v-bind:key="post.id"
          v-bind:class="{ 'dynamic-component-demo-active': post === selectedPost }"
          v-on:click="selectedPost = post">
          {{ post.title }}
        </li>
      </ul>
      <div class="dynamic-component-demo-post-container">
        <div  v-if="selectedPost" class="dynamic-component-demo-post" >
          <h3>{{ selectedPost.title }}</h3>
          <div v-html="selectedPost.content"></div>
        </div>
        <strong v-else>
          Click on a blog title to the left to view it.
        </strong>
      </div>
    </div>
  `
})
Vue.component('tab-archive', {
	template: '<div>Archive component</div>'
})
new Vue({
	el: '#dynamic-component-demo',
	data: {
		currentTab: 'Posts',
		tabs: ['Posts', 'Archive']
	},
	computed: {
		currentTabComponent: function() {
			return 'tab-' + this.currentTab.toLowerCase()
		}
	}
})

const AsyncComponent = () => ({
	// 需要加载的组件 (应该是一个 `Promise` 对象)
	component: import('./MyComponent.vue'),
	// 异步组件加载时使用的组件
	loading: LoadingComponent,
	// 加载失败时使用的组件
	error: ErrorComponent,
	// 展示加载时组件的延时时间。默认值是 200 (毫秒)
	delay: 200,
	// 如果提供了超时时间且组件加载也超时了，
	// 则使用加载失败时使用的组件。默认值是：`Infinity`
	timeout: 3000
})

var home = {
	template: '<div>我是主页</div>'
};
var posts = {
	template: '<div>我是提交页</div>'
};
var archive = {
	template: '<div>我是存档页</div>'
};
new Vue({
	el: '#example',
	components: {
		home,
		posts,
		archive,
	},
	data: {
		index: 0,
		arr: ['home', 'posts', 'archive'],
	},
	computed: {
		currentView() {
			return this.arr[this.index];
		}
	},
	methods: {
		change() {
			this.index = (++this.index) % 3;
		}
	}
})
new Vue({
	el: '#example2',
	components: {
		home,
		posts,
		archive,
	},
	data: {
		index: 0,
	},
	methods: {
		change() {
			let len = Object.keys(this.$options.components).length;
			this.index = (++this.index) % len;
		}
	}
})

new Vue({
	el: '#example3',
	data: {
		index: 0,
		msg: '',
		arr: [{
			template: `<div>我是主页</div>`,
			activated() {
				this.$emit('pass-data', '主页被添加');
			},
			deactivated() {
				this.$emit('pass-data', '主页被移除');
			},
		}, {
			template: `<div>我是提交页</div>`
		}, {
			template: `<div>我是存档页</div>`
		}],
	},
	computed: {
		currentView() {
			return this.arr[this.index];
		}
	},
	methods: {
		change() {
			var len = this.arr.length;
			this.index = (++this.index) % len;
		},
		getData(value) {
			this.msg = value;
			setTimeout(() => {
				this.msg = '';
			}, 1000)
		}
	}
})

// #访问根实例
// Vue 根实例
new Vue({
  data: {
    foo: 1
  },
  computed: {
    bar: function () { /* ... */ }
  },
  methods: {
    baz: function () { /* ... */ }
  }
})
// 所有的子组件都可以将这个实例作为一个全局 store 来访问或使用。
// 获取根组件的数据
this.$root.foo

// 写入根组件的数据
this.$root.foo = 2

// 访问根组件的计算属性
this.$root.bar

// 调用根组件的方法
this.$root.baz()

/**
 * 注:对于 demo 或非常小型的有少量组件的应用来说这是很方便的。
 * 不过这个模式扩展到中大型应用来说就不然了。因此在绝大多数情况下，我们强烈推荐使用 Vuex 来管理应用的状态。
 */

//#访问父级组件实例
/**
 * 和 $root 类似，$parent 属性可以用来从一个子组件访问父组件的实例。
 * 它提供了一种机会，可以在后期随时触达父级组件，以替代将数据以 prop 的方式传入子组件的方式。
 */

//注意:在绝大多数情况下，触达父级组件会使得你的应用更难调试和理解，尤其是当你变更了父级组件的数据的时候。
// 当我们稍后回看那个组件的时候，很难找出那个变更是从哪里发起的。

//针对需要向任意更深层级的组件提供上下文信息时推荐依赖注入

//#访问子组件实例或子元素

/**
 * 尽管存在 prop 和事件，有的时候你仍可能需要在 JavaScript 里直接访问一个子组件。
 * 为了达到这个目的，你可以通过 ref 特性为这个子组件赋予一个 ID 引用。
 */
/**
<base-input ref="usernameInput"></base-input>

现在在你已经定义了这个 ref 的组件里，你可以使用：
this.$refs.usernameInput
来访问这个 <base-input> 实例，以便不时之需。

methods: {
  // 用来从父级组件聚焦输入框
  focus: function () {
    this.$refs.input.focus()
  }
}

这样就允许父级组件通过下面的代码聚焦 <base-input> 里的输入框：

this.$refs.usernameInput.focus()

注:
$refs 只会在组件渲染完成之后生效，并且它们不是响应式的。
这仅作为一个用于直接操作子组件的“逃生舱”——你应该避免在模板或计算属性中访问 $refs。
**/

/**#程序化的事件侦听器***/

/**
 * 
 通过 $on(eventName, eventHandler) 侦听一个事件
 通过 $once(eventName, eventHandler) 一次性侦听一个事件
 通过 $off(eventName, eventHandler) 停止侦听一个事件
 * 
 * 
 */
/**
 * 
 mounted: function () {
   var picker = new Pikaday({
     field: this.$refs.input,
     format: 'YYYY-MM-DD'
   })
 
   this.$once('hook:beforeDestroy', function () {
     picker.destroy()
   })
 }
 
 mounted: function () {
   this.attachDatepicker('startDateInput')
   this.attachDatepicker('endDateInput')
 },
 methods: {
   attachDatepicker: function (refName) {
     var picker = new Pikaday({
       field: this.$refs[refName],
       format: 'YYYY-MM-DD'
     })
 
     this.$once('hook:beforeDestroy', function () {
       picker.destroy()
     })
   }
 }
 */
/**组件之间的循环引用**/
/**
 * 
 * 
 * 
 为了解释这里发生了什么，我们先把两个组件称为 A 和 B。模块系统发现它需要 A，
 但是首先 A 依赖 B，但是 B 又依赖 A，但是 A 又依赖 B，如此往复。这变成了一个循环，
 不知道如何不经过其中一个组件而完全解析出另一个组件。为了解决这个问题，
 我们需要给模块系统一个点，在那里“A 反正是需要 B 的，但是我们不需要先解析 B。”
 在我们的例子中，把 <tree-folder> 组件设为了那个点。我们知道那个产生悖论的子组件是 <tree-folder-contents> 组件
 ，所以我们会等到生命周期钩子 beforeCreate 时去注册它：
 
beforeCreate: function () {
  this.$options.components.TreeFolderContents = require('./tree-folder-contents.vue').default
}
或在本地注册组件的时候，你可以使用 webpack 的异步 import：

components: {
  TreeFolderContents: () => import('./tree-folder-contents.vue')
}
 * 
 */

/**模板定义的替代品**/
/**
内联模板
当 inline-template 这个特殊的特性出现在一个子组件上时，这个组件将会使用其里面的内容作为模板，
而不是将其作为被分发的内容。这使得模板的撰写工作更加灵活。
**/

/**
<my-component inline-template>
  <div>
    <p>These are compiled as the component's own template.</p>
    <p>Not parent's transclusion content.</p>
  </div>
</my-component>

注:不过，inline-template 会让模板的作用域变得更加难以理解。
所以作为最佳实践，请在组件内优先选择 template 选项或 .vue 文件里的一个 <template> 元素来定义模板。
 */

/**
 * 
 * 
X-Template

另一个定义模板的方式是在一个 <script> 元素中，并为其带上 text/x-template 的类型，
然后通过一个 id 将模板引用过去。例如：
<script type="text/x-template" id="hello-world-template">
  <p>Hello hello hello</p>
</script>

Vue.component('hello-world', {
  template: '#hello-world-template'
})

注:这些可以用于模板特别大的 demo 或极小型的应用，但是其它情况下请避免使用，因为这会将模板和该组件的其它定义分离开。
 */

/**控制更新**/
//通过 v-once 创建低开销的静态组件
/**
 渲染普通的 HTML 元素在 Vue 中是非常快速的，但有的时候你可能有一个组件，
 这个组件包含了大量静态内容。在这种情况下，你可以在根元素上添加 v-once 特性以确保这些内容只计算一次然后缓存起来，
 就像这样：
 */
Vue.component('terms-of-service', {
  template: `
    <div v-once>
      <h1>Terms of Service</h1>
      ... a lot of static content ...
    </div>
  `
})

