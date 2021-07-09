<template>
	<nav class="filter">
		<span
			class="filter__item"
			v-for="(category, index) in categories"
			:key="index"
			:class="{ 'filter__item-isActive': index === isActive }"
			@click="setLinkActive(index), changeFilterValue(category)"
		>
			{{ category }}
		</span>
	</nav>
	<section class="project__container">
		<!-- link and container -->
		<transition-group name="fade">
			<a :href="repo.github" target="_blank" class="project" v-for="(repo, index) in filterRepo" :key="index">
				<img :src="content"  class="project__img"/>
                <p class="project__name">	{{ repo.name }} </p>
			

				<!-- overlay when hover -->
				<article
					class="project__overlay"
					:class="{ 'project__overlay-isActive': index === isRepoActive }"
					@mouseenter="setRepoActive(index)"
					@mouseleave="setRepoActive(null)"
				>
					<article class="project__categories" v-for="(language, i) in repo.languages" :key="i">
						{{ i }}
					</article>
				</article>
			</a>
		</transition-group>
	</section>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import linkIsActive from '../composables/linkIsActive'
import Repository from '../types/repository'

export default defineComponent({
	name: 'Home',
	setup() {
		// link active
		let { isActive, setLinkActive, setRepoActive, isRepoActive } = linkIsActive()

		// array of language categories
		const categories = ref(['all', 'Vue', 'React', 'JavaScript', 'Swift', 'C#'])
		const repos = ref([])
		const content = ref('')

		const filter = ref('')

		// change the filter value
		function changeFilterValue(s: string) {
			filter.value = s
		}

		// filter repos
		const filterRepo = computed(() => {
			if (filter.value == '' || filter.value == 'all') {
				return repos.value
			}
			return repos.value.filter((arr) => arr.languages.hasOwnProperty(filter.value))
		})

		// get Data
		const getData = async () => {
			const url = 'https://api.github.com/users/Mesterduc/repos'
			const respose = await fetch(url)
			const result = await respose.json()
			result.forEach((e) => {
				getProjectLanguage(e.languages_url).then((data) => {
					let repo: Repository = {
						name: e.name,
						url: e.languages_url,
						languages: data,
						github: e.html_url,
					}
					repos.value.push(repo)
				})
			})
		}
		onMounted(getData)

		// get readme file
		const fetchReadme = async () => {
			// const url = 'https://api.github.com/repos/Mesterduc/walkSite/contents/walksite/README.md'
			const url = 'https://api.github.com/repos/Mesterduc/bluebook/contents/README.md'
			const respose = await fetch(url)
			const result = await respose.json()
			// console.log(atob(result.content))
			// content.value = atob(result.content)
			// console.log(content.value)
			let str = atob(result.content)
			var mySubString = str.substring(str.lastIndexOf('(') + 1, str.lastIndexOf(')'))
			// console.log(mySubString)
			content.value = mySubString
		}
		fetchReadme()

		// get used languages that is used in the project
		async function getProjectLanguage(url: string) {
			const respose = await fetch(url)
			const result = await respose.json()
			return result
		}

		return {
			changeFilterValue,
			filterRepo,
			repos,
			content,
			categories,
			isActive,
			setLinkActive,
			setRepoActive,
			isRepoActive,
		}
	},
})
</script>

<style lang="scss" scoped>
.filter {
	display: flex;
	justify-content: center;
	margin: 2rem 0;
	padding-bottom: 0.1rem;

	&__item {
		border-radius: 10px;
		font-size: 2.2rem;
		text-transform: uppercase;
		margin: 0 0.6rem;
		padding: 0.2rem 0.6rem;

		&:hover {
			// background: gray;
			cursor: pointer;
			// text-decoration: underline;
		}

		&-isActive {
			// background: gray;
			text-decoration: underline;
			// border-bottom: 1px solid black;
			padding-bottom: 2px;
		}
	}
}
.project {
	color: black;
	width: 100%;
	text-decoration: none;
	display: flex;
	justify-content: center;
	border: solid 1px black;
	position: relative;
	-webkit-transition: all 0.6s ease;
	transition: all 0.6s ease;
	animation: fade-in 1s;

	&:hover::before {
		background: white;
		transition: all 0.5s ease-in-out;
		height: 100%;
	}
	&::before {
		content: '';
		filter: brightness(60%);
		opacity: 0.7;
		position: absolute;
		// transition: all 0.5s ease-in-out;
		height: 0;
		top: 0;
		left: 0;
		width: 100%;
	}

	&__container {
		display: grid;
		// grid-template-columns: repeat(3, 1fr);
		grid-template-columns: repeat(2, 50%);
		grid-auto-rows: 100px;
		gap: 1rem;
	}
    &__name {
        z-index: 1;
    }
    &__img {
        position: absolute;
        left: 0;
        top:0;
        width: 100%;
        height: 100%;
    }

	&__overlay {
		opacity: 0;
		position: absolute;
		height: 100%;
		width: 100%;
		top: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		transition: all 0.75s ease-in-out;
		&-isActive {
			opacity: 1;
		}
	}
	&__categories {
		border: solid 1px black;
		margin-right: 1rem;
		padding: 0.5rem;
		border-radius: 0.5rem;
	}
}

.fade-leave-active {
	-webkit-transition: all 0.6s ease;
	transition: all 0.6s ease;
	animation: fade-in 1s reverse;
}
.fade-enter-active {
	-webkit-transition: all 0.6s ease;
	transition: all 0.6s ease;
	animation: fade-in 1s;
}

.fade-enter-from {
	transform: scale(0.5) translatey(-80px);
	opacity: 0;
}
.fade-leave-to {
	transform: translatey(30px);
	opacity: 0;
}

.fade-move {
	-webkit-transition: -webkit-transform 0.6s;
	transition: -webkit-transform 0.6s;
	transition: transform 0.6s;
	transition: transform 0.6s, -webkit-transform 0.6s;
}

// @keyframes fade-in {
//   from {
//     opacity: 0;
//     width: 0;
//     background-color: blue;
//   }
//   to {
//     opacity: 1;
//     width: 100%;
//   }
// }
</style>
