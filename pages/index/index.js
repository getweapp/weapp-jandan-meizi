Page({
  data: {
    images: [],
    current: 0,
    width: 375,
    height: 0,
    autoplay: false,
    duration: 5000,
    timer: null
  },
  changePrev: function(e) {
    if(this.data.autoplay){
       clearInterval(this.data.timer)
       this.setData({
         autoplay:false,
         timer: null
       })
     }
    if(this.data.current == 0){
      wx.showToast({
         title: '只有这么多了',
  icon: 'success',
  duration: 2000
      })
      return
    }
    this.setData({
      current: (this.data.current>0)?this.data.current-1:0
    })
    return
    
  },
  changeNext: function(e) {
    this.fetch()
    this.setData({
      current: this.data.current+1
    })
  },
   changeAutoplay: function(e) {
     if(this.data.autoplay){
       clearInterval(this.data.timer)
       this.setData({
         autoplay:false,
         timer: null
       })
       return
     }
    this.setData({
      autoplay:true,
      timer: setInterval(()=>{
       this.fetch()
    this.setData({
      current: this.data.current+1
    })
    },this.data.duration)
    })
    
  },
  fetch() {
    wx.showToast({
         title: '准备妹子中...',
  icon: 'loading',
  duration: 2000
      })
    wx.request({
      url:'https://api.getweapp.com/vendor/jandan/random',
      success: (res) => {
        wx.hideToast()
        const data = res.data
        console.log(data)
        const images = this.data.images
        data.url = 'http://'+data.url.substr(7)
        images.push(data)
        console.log(images)
        this.setData({
          images: images
        })
      }
    })
  },
  onLoad() {
    this.fetch()
    wx.getSystemInfo({
    success: (res) => {
    console.log(res)
    this.setData({
      width: res.windowWidth,
      height: res.windowHeight
    })
  }
})
  }
})