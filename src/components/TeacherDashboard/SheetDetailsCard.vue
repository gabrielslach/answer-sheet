<template>
    <q-card flat bordered class="q-my-sm q-pa-md">
        <div class="text-caption float-right">No. of submissions: {{noOfSubmission}}</div>
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
import {mapGetters} from 'vuex';
export default {
    props: {
        sectionName: {
            type: String,
            default: 'Class Name'
        },
        activityName: {
            type: String,
            default: 'Activity Name'
        },
        activityID: {
            type: String,
            default: ''
        }, 
        noOfSubmission: {
            type: Number,
            default: 0
        },
    },
    computed: {
        ...mapGetters(['getUser'])
    },
    methods: {
        openSheet () {
            window.open(`/sheet-manager/${this.activityID}/edit`)
        }
    }
}
</script>

<style>

</style>