//token验证未通过的弹窗功能
function tokenValidate(OBJ){
     if(!localStorage.getItem('token')){
         OBJ.$router.push('/login')
     }
}
function openNode(OBJ){
    const h = OBJ.$createElement;
    let updateResult = {};
    OBJ.$msgbox({
        title: '提示',
        message: h('p', null, [
            h('span', null, OBJ.message),
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: async (action, instance, done) => {
            if (action === 'confirm') {
                instance.confirmButtonLoading = true;
                instance.confirmButtonText = '执行中...';
                    //    -----------------------------------
                    //    下面写执行内容，要在大约3秒内执行完成

                    updateResult = await OBJ.articlePublishFun();
                    console.log(updateResult)


                    //    结束
                    //    -----------------------------------
                setTimeout(() => {
                    done();

                    setTimeout(() => {
                        instance.confirmButtonLoading = false;
                    }, 300);
                }, 500);
            } else {
                done();
            }
        }
    }).then(action => {
        notify(OBJ,updateResult)
    });
}
export default{
    tokenValidate,
    openNode
}