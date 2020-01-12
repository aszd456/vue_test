var data = {
	a: 1
};
var vm1 = new Vue({
	data: data
});
console.log(vm1.a == data.a);
new Vue({
	data: {
		a: 1
	},
	/***
	不要在选项属性或回调上使用箭头函数，比如 created: () => console.log(this.a) 
	或 vm.$watch('a', newValue => this.myMethod())。
	因为箭头函数并没有 this，this 会作为变量一直向上级词法作用域查找，
	直至找到为止，经常导致 Uncaught TypeError: Cannot read property of undefined 
	或 Uncaught TypeError: this.myMethod is not a function 之类的错误
	**/
	created: function() { //比如 created 钩子可以用来在一个实例被创建之后执行代码
		console.log('a is:' + this.a);
	}
});

new Vue({
	el: '#html-test',
	data: {
		rawHtml: '<span style="color:red">This should be red</span>'
	}
})

var vm2 = new Vue({
	el: '#example',
	data: {
		message: 'Hello'
	},
	computed: { //计算属性
		reversedMessage: function() {
			return this.message.split('').reverse().join('')
		}
	}
});

var vm3 = new Vue({
	el: '#demo',
	data: {
		firstName: 'Foo',
		lastName: 'Bar'
	},
	computed: {
		fullName: {
			// getter
			get: function() {
				return this.firstName + ' ' + this.lastName
			},
			// setter
			set: function(newValue) {
				var names = newValue.split(' ')
				this.firstName = names[0]
				this.lastName = names[names.length - 1]
			}
		}
	}
})

let watchExampleVM = new Vue({
	el: '#watch-example',
	data: {
		question: '',
		answer: 'I cannot give you an answer until you ask a question!'
	},
	watch: {
		question: function(newQuestion, oldQuestion) {
			this.answer = 'Waiting for you to stop typing...'
			this.debouncedGetAnswer()
		}
	},
	created: function() {
		//在实例创建完成后被立即调用。
		// 在这一步，实例已完成以下的配置：数据观测 (data observer)，属性和方法的运算，watch/event 事件回调。
		// 然而，挂载阶段还没开始，$el 属性目前不可见。
		// `_.debounce` 是一个通过 Lodash 限制操作频率的函数。
		// 在这个例子中，我们希望限制访问 yesno.wtf/api 的频率
		// AJAX 请求直到用户输入完毕才会发出。想要了解更多关于
		// `_.debounce` 函数 (及其近亲 `_.throttle`) 的知识，
		// 请参考：https://lodash.com/docs#debounce
		this.debouncedGetAnswer = _.debounce(this.getAnswer, 2000)
	},
	methods: {
		getAnswer: function() {
			if (this.question.indexOf('?') === -1) {
				this.answer = 'Questions usually contain a question mark. ;-)'
				return
			}
			this.answer = 'Thinking...'
			let vm = this
			axios.get('https://yesno.wtf/api')
				.then(function(response) {
					vm.answer = _.capitalize(response.data.answer)
				})
				.catch(function(error) {
					vm.answer = 'Error! Could not reach the API. ' + error
				})
		}
	}
})

let bind_vm = new Vue({
	el: '#bind',
	data: {
		isActive: true,
		error: false
	},
	computed: {
		classObject: function() {
			return {
				active: this.isActive && !this.error,
				'text-danger': this.error && this.error.type == 'fatal'
			}
		}
	}
})

new Vue({
	el: '#vif',
	data: {
		type: 'Z'
	}
})

new Vue({
	el: '#key-example',
	data: {
		loginType: 'username'
	},
	methods: {
		toggleLoginType: function() {
			return this.loginType = this.loginType === 'username' ? 'email' : 'username'
		}
	}
})

var example1 = new Vue({
	el: '#example-1',
	data: {
		items: [{
				message: 'Foo'
			},
			{
				message: 'Bar'
			}
		]
	}
})

new Vue({
	el: '#example-2',
	data: {
		parentMessage: 'Parent',
		items: [{
				message: 'Foo'
			},
			{
				message: 'Bar'
			}
		]
	}
})

new Vue({
	el: '#v-for-object',
	data: {
		object: {
			title: 'How to do lists in Vue',
			author: 'Jane Doe',
			publishedAt: '2016-04-10'
		}
	}
})
/**
 * 
Vue 将被侦听的数组的变异方法进行了包裹，所以它们也将会触发视图更新。这些被包裹过的方法包括：
push()
pop()
shift()
unshift()
splice()
sort()
reverse()
替换数组
example1.items = example1.items.filter(function (item) {
  return item.message.match(/Foo/)
})     

 */

// vm.items[1] = 'x' // 不是响应性的  vm.items.splice(indexOfItem, 1, newValue)
// vm.items.length = 2 // 不是响应性的  vm.items.splice(newLength)

// 解决方案:
// Vue.set
// Vue.set(vm.items, indexOfItem, newValue)
// vm.$set(vm.items, indexOfItem, newValue)

// Vue.set(object, propertyName, value) 方法向嵌套对象添加响应式属性
var vm = new Vue({
	data: {
		userProfile: {
			name: 'Anika'
		}
	}
})

Vue.set(vm.userProfile, 'age', 27)
//vm.$set(vm.userProfile, 'age', 27)


//Object.assign方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。
vm.userProfile = Object.assign({}, vm.userProfile, {
	age: 27,
	favoriteColor: 'Vue Green'
})

new Vue({
	el: '#filterList',
	data: {
		numbers: [1, 2, 3, 4, 5]
	},
	computed: {
		evenNumbers: function() {
			return this.numbers.filter((number) => {
				return number % 2 != 0;
			})
		}
	},
	//在计算属性不适用的情况下 (例如，在嵌套 v-for 循环中) 你可以使用一个方法
	methods: {
		even: function(numbers) {
			return numbers.filter((number) => {
				return number % 2 === 0
			})
		}
	}
})

Vue.component('todo-item', {
	template: `
    <li>
      {{ title }}
      <button @click="$emit('remove')">Remove</button>
    </li>`,
	props: ['title']
})
new Vue({
	el: '#todo-list-example',
	data: {
		newTodoText: '',
		todos: [{
				id: 1,
				title: 'Do the dishes',
			},
			{
				id: 2,
				title: 'Take out the trash',
			},
			{
				id: 3,
				title: 'Mow the lawn'
			}
		],
		nextTodoId: 4
	},
	methods: {
		addNewTodo() {
			if (this.newTodoText == '') {
				return;
			}
			this.todos.push({
				id: this.nextTodoId++,
				title: this.newTodoText
			})
			this.newTodoText = ''
		},
		deleteTode(index) {
			this.todos.splice(index, 1);
		}
	}
})

new Vue({
	el: '#example-on-1',
	data: {
		counter: 0
	}
})

new Vue({
	el: '#example-on-2',
	data: {
		name: 'Vue.js'
	},
	methods: {
		greet(event) {
			alert('Hello ' + this.name + '!');
			if (event) {
				alert(event.target.tagName);
			}
		}
	}
})
new Vue({
	el: '#example-on-3',
	methods: {
		say(message, event) {
			alert(message + '' + event.target.tagName)
		}
	}
})

new Vue({
	el: '#warnApp',
	methods: {
		warn: function(message, event) {
			// 现在我们可以访问原生事件对象
			if (event) event.preventDefault()
			alert(message)
		}
	}
})

/**事件修饰符
.stop
.prevent
.capture
.self
.once
.passive
<!-- 阻止单击事件继续传播 -->
<a @click.stop="doThis"></a>

<!-- 提交事件不再重载页面 -->
<form @submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联 -->
<a @click.stop.prevent="doThat"></a>

<!-- 只有修饰符 -->
<form @submit.prevent></form>

<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
<div @click.capture="doThis">...</div>

<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div @click.self="doThat">...</div>

<!-- 点击事件将只会触发一次 -->
<a v-on:click.once="doThis"></a>

<!-- 滚动事件的默认行为 (即滚动行为) 将会立即触发 -->
<!-- 而不会等待 `onScroll` 完成  -->
<!-- 这其中包含 `event.preventDefault()` 的情况 -->
<div v-on:scroll.passive="onScroll">...</div>
这个 .passive 修饰符尤其能够提升移动端的性能

<!-- 只有在 `key` 是 `Enter` 时调用 `vm.submit()` -->
<input v-on:keyup.enter="submit">


可以直接将 KeyboardEvent.key 暴露的任意有效按键名转换为 kebab-case 来作为修饰符
<input v-on:keyup.page-down="onPageDown">
在上述示例中，处理函数只会在 $event.key 等于 PageDown 时被调用

为了在必要的情况下支持旧浏览器，Vue 提供了绝大多数常用的按键码的别名：

.enter
.tab
.delete (捕获“删除”和“退格”键)
.esc
.space
.up
.down
.left
.right


可以用如下修饰符来实现仅在按下相应按键时才触发鼠标或键盘事件的监听器。

.ctrl
.alt
.shift
.meta  

<!-- Alt + C -->
<input @keyup.alt.67="clear">

<!-- Ctrl + Click -->
<div @click.ctrl="doSomething">Do something</div>


.exact 修饰符允许你控制由精确的系统修饰符组合触发的事件。

<!-- 即使 Alt 或 Shift 被一同按下时也会触发 -->
<button @click.ctrl="onClick">A</button>

<!-- 有且只有 Ctrl 被按下的时候才触发 -->
<button @click.ctrl.exact="onCtrlClick">A</button>

<!-- 没有任何系统修饰符被按下的时候才触发 -->
<button @click.exact="onClick">A</button>


.left
.right
.middle
这些修饰符会限制处理函数仅响应特定的鼠标按钮。
*
*
**/

new Vue({
	el: '#model-1',
	data: {
		message: ''
	}
})
new Vue({
	el: '#model-2',
	data: {
		message: ''
	}
})

new Vue({
	el: '#example-check',
	data: {
		checked: false
	}
})

new Vue({
	el: '#example-checkbox-3',
	data: {
		checkedNames: []
	}
})

new Vue({
	el: '#example-4',
	data: {
		picked: 'One'
	}
})

new Vue({
	el: '#example-selected-5',
	data: {
		selected: ''
	}
})

new Vue({
	el: '#example-6',
	data: {
		selected: []
	}
})

new Vue({
	el: '#example-7',
	data: {
		selected: 'C',
		options: [{
				text: 'One',
				value: 'A'
			},
			{
				text: 'Two',
				value: 'B'
			},
			{
				text: 'Three',
				value: 'C'
			}
		]
	}
})

//定义组件
Vue.component('button-counter', {
	data: function() {
		return {
			count: 0
		}
	},
	template: '<div><button @click="count++">You clicked me {{ count }} times.</button><slot></slot></div>'
})

new Vue({
	el: '#components-demo'
})


var buttonCounter2Data = {
	count: 0
}
Vue.component('button-counter2', {
	data: function() {
		return buttonCounter2Data
	},
	template: '<button @click="count++">You clicked me {{ count }} times.</button>'
})
new Vue({
	el: '#components-demo3'
})


Vue.component('blog-post', {
	props: ['title'],
	template: '<h3>{{ title }}</h3>'
})
new Vue({
	el: '#components-blog'
})


Vue.component('blog-post', {
	props: ['post'],
	template: `
    <div class="blog-post">
      <h3>{{ post.title }}</h3>
      <div v-html="post.content"></div>
    </div>
  `
})
new Vue({
	el: '#components-blog2',
	data: {
		posts: [{
				id: 1,
				title: 'My journey with Vue',
				content: '.1..content...'
			},
			{
				id: 2,
				title: 'Blogging with Vue',
				content: '.2..content...'
			},
			{
				id: 3,
				title: 'Why Vue is so fun',
				content: '.3..content...'
			}
		]
	}
})

Vue.component('blog-post2', {
	props: ['post'],
	template: `
    <div class="blog-post">
      <h3>{{ post.title }}</h3>
      <button @click="$emit('enlarge-text')">
        Enlarge text
      </button>
	  <button @click="$emit('enlarge-text2',0.1)">
	    Enlarge text2
	  </button>
	  <button @click="$emit('enlarge-text3')">
		Enlarge text3
	  </button>
      <div v-html="post.content"></div>
    </div>
  `
})
new Vue({
	el: '#blog-posts-events-demo',
	data: {
		posts: [{
				id: 1,
				title: 'My journey with Vue',
				content: '...content...'
			},
			{
				id: 2,
				title: 'Blogging with Vue',
				content: '...content...'
			},
			{
				id: 3,
				title: 'Why Vue is so fun',
				content: '...content...'
			}
		],
		postFontSize: 1
	},
	methods: {
		onEnlargeText(enlargeAmount) {
			this.postFontSize += enlargeAmount
		}
	}
})


Vue.component('alert-box', {
	template: '\
    <div class="demo-alert-box">\
      <strong>Error!</strong>\
      <slot>123456</slot>\
    </div>\
  '
})
new Vue({
	el: '#slots-demo'
})



Vue.component('tab-home', { template: '<div>Home component</div>' })
Vue.component('tab-posts', { template: '<div>Posts component</div>' })
Vue.component('tab-archive', { template: '<div>Archive component</div>' })
new Vue({
	el: '#dynamic-component-demo',
	data: {
		currentTab: 'Home',
		tabs: ['Home', 'Posts', 'Archive']
	},
	computed: {
		currentTabComponent: function() {
			return 'tab-' + this.currentTab.toLowerCase()
		}
	}
})
