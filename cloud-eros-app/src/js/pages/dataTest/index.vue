<template>
    <div>
        <status-bar></status-bar>
        <div @click="openDatePicker">{{selectedDate}}</div>
        <date-picker
                v-if="showDatePicker"
                :date="date"
                :min-date="minDate"
                :max-date="maxDate"
                @confirm="confirm"
                @cancel="cancel"
        ></date-picker>
    </div>
</template>
<script>
    import datePicker from '../../components/datePicker'
    import StatusBar from '../../components/statusBar'

    export default ({
        data () {
            return {
                date: '2017-09-11',
                minDate: '2000-09-11',
                maxDate: '2020-09-11',
                showDatePicker: false,
                selectedDate: '点击选择日期'
            }
        },
        methods: {
            openDatePicker () {
                this.showDatePicker = true
            },
            confirm (value) {
                this.showDatePicker = false
                this.selectedDate = value
            },
            cancel () {
                this.showDatePicker = false
            }
        },
        components: {
            datePicker, StatusBar
        }
    })
</script>
