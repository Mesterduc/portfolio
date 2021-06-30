<template>
    <h1>This is the Hompepage</h1>
    <!-- <h2>{{data[0].name}}</h2> -->
    <h2 v-for="repo in data" key="repo.id">
        {{repo.languages_url}}
        </h2>
        -----------------------
        <h2 v-for="(repo, key) in languages">
        {{key}}
        </h2>
        ------------------------
        <h2>
            {{content}}
        </h2>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    name: 'Home',
    setup() {
        const data = ref([])
        const languages = ref([])
        const content = ref('')

        const fetchData = async () => {
            const url = 'https://api.github.com/users/Mesterduc/repos'
            const respose = await fetch(url)
            const result = await respose.json()
            // console.log(result)
            data.value = result

        }
          fetchData()

        const fetchLanguage = async () => {
            const url = 'https://api.github.com/repos/Mesterduc/Mundhaeld/languages'
            const respose = await fetch(url)
            const result = await respose.json()
            // console.log(result)
            languages.value = result

        }
        fetchLanguage()

        const fetchReadme = async () => {
            const url = 'https://api.github.com/repos/Mesterduc/walkSite/contents/walksite/README.md'
            const respose = await fetch(url )
            const result = await respose.json()
            // console.log(result.content)
            
            content.value = atob(result.content)

        }
        fetchReadme()

        return {data, languages, content}
        
    },
})
</script>




<style lang="scss" scoped>

</style>
