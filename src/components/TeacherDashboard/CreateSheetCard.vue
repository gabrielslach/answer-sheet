<template>
    <q-card flat bordered class="q-ma-lg q-pa-md">
        <q-input label='Class Name *' standout="bg-teal text-white" v-model.lazy="className" class="q-mb-md" />
        <q-input label='Activity Name *' standout="bg-teal text-white" v-model.lazy="activityName" class="q-mb-lg" />
        <q-btn push color="primary" class='full-width' label="Create Sheet" size="lg" @click="handleCreate" />
    </q-card>
</template>

<script>
import {ref, computed} from 'vue';
import {useRouter} from 'vue-router';
import {useStore} from 'vuex';

export default {
    setup() {
        const className = ref(null);
        const activityName = ref(null);
        const router = useRouter();

        const store = useStore();

        const userInfo = computed(()=>store.getters.getUser);

        const handleCreate = () => {
            router.replace({
                name: 'newDeck',
                params: {
                    teacherName: userInfo.value.teacherID,
                    sectionName: className.value,
                    activityName: activityName.value,
                    mode: 'new'
                }
            })
        }

        return {
            className,
            activityName,
            handleCreate
        }
    }
}
</script>

<style>

</style>