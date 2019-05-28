const db = require('../../utils/db')
const util = require('../../utils/util')

Page({
  data: {
    productList: [],
  },

  onLoad() {
    this.getProductList()
  },

  getProductList() {
    wx.showLoading({
      title: 'Loading...',
    })

    db.getProductList().then(result => {
      wx.hideLoading()

      const productList = result.data

      productList.forEach(product => product.price = util.formatPrice(product.price))

      if (productList.length) {
        this.setData({
          productList
        })
      }
    }).catch(err => {
      console.error(err)
      wx.hideLoading()
    })
  },
})