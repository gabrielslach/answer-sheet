<template>
    <q-card flat bordered class="q-my-sm q-mx-lg q-pa-md">
        <div class="text-subtitle1">{{ sectionName }}</div>
        <div class="text-h6"> 
            <p style="color: gray; display: inline">{{noOfSubmission > 0 ? '(Done)': ''}} </p>
            {{ activityName }}
            </div>
        <div class="float-right">
            <q-btn push rounded size="md" class="q-ml-sm" color="primary" label="Open sheet" @click="openSheet" />
        </div>
    </q-card>
</template>

<script>
export default {
    props: {
        teacherName: {
            type: String,
            default: 'Teacher Name'
        },
        sectionName: {
            type: String,
            default: 'Class Name'
        },
        activityName: {
            type: String,
            default: 'Activity Name'
        },
        noOfSubmission: {
            type: Number,
            default: 0
        }
    },
    methods: {
        openSheet () {
            window.open(`/${this.teacherName}/${this.sectionName}/${this.activityName}`)
        }
    }
}
</script>

<style>

</style>