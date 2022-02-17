<template>
    <q-card flat bordered class="q-pa-md">
        <q-select label='Section Name *' standout="bg-teal text-white" v-model.lazy="sectionName" :options="sections" class="q-mb-md" />
        <q-input label='Activity Name *' standout="bg-teal text-white" v-model.lazy="activityName" class="q-mb-lg" />
        <q-btn push color="primary" class='full-width' label="Create Sheet" size="lg" @click="handleCreate" />
    </q-card>
</template>

<script>
import {ref, computed} from 'vue';
// import {useRouter} from 'vue-router';
import {useStore} from 'vuex';

export default {
    setup() {
        const sectionName = ref(null);
        const activityName = ref(null);
        // const router = useRouter();

        const store = useStore();

        const userInfo = computed(()=>store.getters.getUser);

        const teacherID = userInfo.value.uid;

        store.dispatch('fetchSections', teacherID);

        const sections = computed(
            ()=>store.getters.getSections
            );

        const handleCreate = () => {
            store.dispatch("createActivity", {
                teacherID, 
                sectionID: sectionName.value.value, 
                activityName:activityName.value
            });
            // router.replace({
            //     name: 'newDeck',
            //     params: {
            //         teacherName: userInfo.value.teacherID,
            //         sectionName: sectionName.value,
            //         activityName: activityName.value,
            //         mode: 'new'
            //     }
            // })
        }

        return {
            sectionName,
            activityName,
            sections,
            handleCreate
        }
    }
}
</script>

<style>

</style>