

  <template>
    <div>
      <div class="ivu-modal-mask" style=""></div>
      <div class="ivu-modal-wrap">
        <div class="ivu-modal" style="width: 520px; top:30%;">
          <div class="ivu-modal-content"><a class="ivu-modal-close"><i @click="close"
                                                                       class="ivu-icon ivu-icon-ios-close"></i></a>
            <div class="ivu-modal-header">
            <div class="ivu-modal-header-inner">请选择行业</div>
            </div>
            <div class="ivu-modal-body">

                <Tree ref="tree" :data="data3"  :load-data="loadData"></Tree>

              <!--<Button @click.native = "getSelectTree">获取</Button>-->
            </div>
            <div class="ivu-modal-footer">
            <button type="button" @click="close" class="ivu-btn ivu-btn-text ivu-btn-large"><!----> <!---->
            <span>取消</span></button>
            <button type="button" @click="getSelectTree" class="ivu-btn ivu-btn-primary ivu-btn-large"><!----> <!---->
            <span>确定</span></button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </template>


<script>
  export default {
    data () {
      return {
        data3: [
          {
            title: '全部行业',
            loading: false,
            id:'',
            children: [],

          }

        ],
        id:0,
        selectedTree:{}
      }
    },
    mounted(){
      // this.initTree();
    },
    methods: {
      initTree(){
        this.$http.post('financial/industryService/list',{subData:''}).then(res=>{
          // console.log(res.data.data);
          // this.data3 = res.data.data
        })
      },
      close(){
        this.$el.parentNode.removeChild(this.$el);
      },
      getSelectTree(){
        this.selectedTree = this.$refs.tree.getSelectedNodes()[0];
        this.$el.parentNode.removeChild(this.$el);
        if (typeof this.onOk === 'function') {
          this.onOk(this);
        }

        // this.$refs.tree.getSelectedNodes()

      },
      // onOk(){
      //   // alert('123')
      //   console.log(this.$refs.tree.getSelectedNodes())
      //   this.selectedTree = this.$refs.tree.getSelectedNodes();
      //   // console.log(this.selectedTree)
      //
      //     // this.$el.parentNode.removeChild(this.$el);
      //     // if (typeof this.onOk === 'function') {
      //     //   this.onOk(this);
      //     // }
      //
      // },
      loadData (item, callback) {//加载数据
        let that = this;
        // console.log(item);

        this.$http.post('financial/industryService/list',{subData:item.id}).then(res=>{
          // console.log(res.data.data);
          // this.data3 = res.data.data
          setTimeout(() => {
            const tempdata = [];
            const datas = res.data.data;
            if(datas.length>0){
              for(var i in datas){
                if(datas[i].is_leaf == 0){
                  datas[i].children  = [];
                  datas[i].loading = false;
                }
                datas[i].title  = datas[i].name
                tempdata.push(datas[i]);
              }
              callback(tempdata);
            }


          }, 0);


        })

        // alert(this.id);

      }
    }
  }
</script>
