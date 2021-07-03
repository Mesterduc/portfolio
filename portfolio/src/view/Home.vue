<template>
    <h1>This is the Hompepage</h1>

        <section class="filter">
            <article 
            class="filter__item"
            v-for="(category, index) in categories"
            :class="{ 'filter__item-isActive': index === isActive }"
				@click="setLinkActive(index)"
            >
                {{category}}
                </article>
        </section>
        <section class="projects"></section>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import linkIsActive from '../composables/linkIsActive'

export default defineComponent({
    name: 'Home',
    setup() {
        // link active
        let {isActive, setLinkActive} = linkIsActive()

        // array of language categories 
        const categories = ref(['all', 'vue', 'react', 'javascript', 'swift'])

        const repos = ref([])
        const language_url = ref([])
        const languages = ref([])
        const content = ref('')

        // get Data
        const getData = async () =>  {
            const url = 'https://api.github.com/users/Mesterduc/repos'
            const respose = await fetch(url)
            const result = await respose.json()
            // console.log(result)
            repos.value = result
            result.forEach(async e => {
                language_url.value.push(e.languages_url)
                const url = e.languages_url
                const respose = await fetch(url)
                const result = await respose.json()
                languages.value.push(result)
            });
        }

         onMounted(getData)

        // get readme file
        const fetchReadme = async () => {
            const url = 'https://api.github.com/repos/Mesterduc/walkSite/contents/walksite/README.md'
            const respose = await fetch(url )
            const result = await respose.json()
            // console.log(result.content)
            
            content.value = atob(result.content)

        }
        fetchReadme()

        // filter background
        function filterIsActive(){

        }

        return {repos, languages, content, language_url, categories, isActive, setLinkActive }
        
    },
})
</script>




<style lang="scss" scoped>
.filter{
    display: flex;
    justify-content: center;

    &__item{
        font-size: 2.2em;
        text-transform: uppercase;
        margin: 0 0.6em;
        padding: 0.2em 0.6em;

        &:hover{
            background: gray;
            cursor: pointer;
        }

        &-isActive{
            background: gray;
        }

    }


}

</style>
