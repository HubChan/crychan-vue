<template>
	<div class="thread-box">
		<div class="post thread" :id="thread.id">
			<div class="post-info">
				<span class="locked" v-if="thread.isLocked">Locked</span>
				<span class="sticky" v-if="thread.isSticky">Sticky</span>
				<span class="subject" v-if="thread.subject">{{ thread.subject }}</span>
				<span class="name">{{ thread.name }}</span>
				<span class="time">{{ thread.time }}</span>
				<span class="link">
					<router-link :to="{ name: 'thread', params: { boardSlug: thread.board, threadId: thread.id }, hash: '#' + thread.id }">#{{ thread.id }}</router-link>
				</span>
				<span class="open" v-if="!open">
					<router-link :to="{ name: 'thread', params: { boardSlug: thread.board, threadId: thread.id } }">Open</router-link>
				</span>
				<span class="hide" v-if="!open">
					<a @click="" href="#">Hide</a>
				</span>
				<span class="fave">
					<a @click="" href="#">Fave</a>
				</span>
			</div>

			<div class="post-file left" v-if="thread.files.length > 0">
				<a v-for="file in thread.files" :href="file.origin" target="_blank">
					<img :src="file.thumb">
					<span class="file-info">({{ file.resolution }}) {{ file.type }}</span>
				</a>
			</div>

			<div class="post-text" v-html="thread.text"></div>
		</div>
		<div class="omitted" v-if="hasOmitted() && !open">
			{{ getOmitted() }}
			<a @click="" href="#">Expand</a>
		</div>
		<div class="thread-replys" v-if="thread.replys.length > 0">
			<slot></slot>
		</div>
		<hr>
	</div>
</template>

<script>
	export default {
		name: 'thread',
		props: ['thread', 'open', 'replyLimit'],
		methods: {
			hasOmitted() {
				return this.thread.count_replys > this.replyLimit
			},
			getOmitted() {
				let count = this.thread.count_replys - this.replyLimit
				let cases = [2, 0, 1, 1, 1, 2];
				let titles = ['reply', 'replies', 'replies'];
				return count + ' ' + titles[ (count%100 > 4 && count%100 < 20) ? 2 : cases[Math.min(count%10, 5)] ] + ' omitted.';
			}
		}
	}
</script>