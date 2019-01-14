import Vue from 'vue'
import Router from 'vue-router'
import teachHome from '@/pages/teacher/index.vue'
const teacherRouter = [
  {
    path: 'teacherhome',
    name: 'teacherhome',
    component: teachHome
  },
  {
    path: 'reportMgrAdmin',
    name: 'reportMgrAdmin',
    component: (resolve)=>require(['@/pages/teacher/reportMgrAdmin'],resolve),
  },
  {
    path: 'gradeAdmin',
    name: 'gradeAdmin',
    component: (resolve)=>require(['@/pages/teacher/gradeSettingAdmin'],resolve),
  },

]

export default teacherRouter;
