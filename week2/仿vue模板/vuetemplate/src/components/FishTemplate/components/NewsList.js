export default {
  render() {
    return `
        <div class="newslist">
            <div class="news-item" for="item in newslist">
                <div class="img" v-if="item.showImage"><img src="{{image}}"/></div>
                <div class="date" v-if="item.showDate">{{item.name}}</div>
                <div class="title">{{item.name}}</div>
            </div>
        </div>
    `;
  },
};
