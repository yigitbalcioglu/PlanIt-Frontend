<template>
  <a-calendar v-model:value="value">
    <template #dateCellRender="{ current }">
      <ul class="events">
        <li v-for="item in getListData(current)" :key="item.content">
          <a-badge :status="item.type" :text="item.content" />
        </li>
      </ul>
    </template>
    <template #monthCellRender="{ current }">
      <div v-if="getMonthData(current)" class="notes-month">
        <section>{{ getMonthData(current) }}</section>
        <span>Backlog number</span>
      </div>
    </template>
  </a-calendar>
</template>



<script>
import dayjs from 'dayjs';
import {DatePicker} from "ant-design-vue";
import axios from "axios";
export default {
  components:{
    DatePicker,
  },
  data(){
    return {
      selectedDate: null,
      events:[],
    };
  },
  methods:{
    fetchEvents(){
      if (!this.selectedDate){
        return;
      }
      axios.get("/api/events/${this.selectedDate}").then(response=>{
        this.events=response.data;
      }).catch(error=>{
        console.error(error);
      })
    },
    addEvent(event){
      axios
          .post('/api/events', event)
          .then(response=>{

          })
          .catch(error=>{
            console.error(error);
          })
    }
  },

  setup() {
    const value = dayjs();
    function getListData(value) {
      const day = dayjs(value);
      let listData;
      switch (day.date()) {
        case 8:
          listData = [
            { type: 'warning', content: 'Ali Kefali FIFAda ilk siktiğim tarih.' },
            { type: 'success', content: 'Ali Kefalin mağlubiyet rekoru kırdığı tarih.' },
          ];
          break;

        default:
      }
      return listData || [];
    }

    function getMonthData(value) {
      const month = dayjs(value);
    }

    return {
      value,
      getListData,
      getMonthData,
    };
  },
};
</script>
<style scoped>


.events {
  list-style: none;
  margin: 0;
  padding: 0;
}
.events .ant-badge-status {
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  text-overflow: ellipsis;
  font-size: 12px;
}
.notes-month {
  text-align: center;
  font-size: 28px;
}
.notes-month section {
  font-size: 28px;
}
</style>


