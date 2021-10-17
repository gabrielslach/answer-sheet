<template>
    <q-card flat bordered class="q-my-sm q-mx-lg q-pa-md">
        <div class="text-caption float-right">No. of submissions: 18</div>
        <div class="text-subtitle1">{{ sectionName }}</div>
        <div class="text-h6">{{ activityName }}</div>
        <div class="float-right">
            <q-btn outline rounded size="md" class="q-ml-sm" color="primary" label="Download submissions" />
            <q-btn outline rounded size="md" class="q-ml-sm" color="primary" label="Open submissions" />
            <q-btn push rounded size="md" class="q-ml-sm" color="primary" label="Open sheet" @click="openSheet" />
        </div>
    </q-card>
</template>

<script>
export default {
    props: {
        sectionName: {
            type: String,
            default: 'Class Name'
        },
        activityName: {
            type: String,
            default: 'Activity Name'
        }
    },
    methods: {
        openSheet () {
            window.open(`/${this.sectionName}/${this.activityName}`)
        }
    }
}
</script>

<style>

</style>