<template>
  <div class="action-log">
    <div class="video-feed" :class="{'single-video' : selectedCamera }">
      <div
        v-if="shouldShowCamera(1)"
        class="camera"
        @click="selectCamera(1)"
      >
        <div
          v-if="selectedCamera"
          class="camera-hide"
          @click.stop="selectedCamera = 0"
        >❌</div>
        <video muted width="100%" src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" autoplay loop/>
        <div class="title">Camera 1</div>
      </div>

      <div
        v-if="shouldShowCamera(2)"
        class="camera"
        @click="selectCamera(2)"
      >
        <div
          v-if="selectedCamera"
          class="camera-hide"
          @click.stop="selectedCamera = 0"
        >❌</div>
        <video muted width="100%" src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" autoplay loop/>
        <div class="title">Camera 2</div>
      </div>
      <div
        v-if="shouldShowCamera(3)"
        class="camera"
        @click="selectCamera(3)"
      >
        <div
          v-if="selectedCamera"
          class="camera-hide"
          @click.stop="selectedCamera = 0"
        >❌</div>
        <video muted width="100%" src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" autoplay loop/>
        <div class="title">Camera 3</div>
      </div>

      <div
        v-if="shouldShowCamera(4)"
        class="camera"
        @click="selectCamera(4)"
      >
        <div
          v-if="selectedCamera"
          class="camera-hide"
          @click.stop="selectedCamera = 0"
        >❌</div>
        <video muted width="100%" src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" autoplay loop/>
        <div class="title">Camera 4</div>
      </div>

    </div>
    <div class="action-feed">
      <ApolloQuery
        :query="require('../graphql/LogActions.graphql')"
        :variables="variables"
      >
        <ApolloSubscribeToMore
          :document="require('../graphql/LogActionAdded.graphql')"
          :update-query="onActionLogAdded"
        />

        <div slot-scope="{ result: { data } }">
          <template v-if="data">
            <div
              v-for="action of data.logActions"
              :key="action.id"
              class="action-item"
            >
              <span class="createdAt">{{ formatDate(action.createdAt) }}</span>
              <span class="userName">{{ action.userName }}</span>
              <span
                :class="getActionClass(action.action)"
                class="action"
              >{{ action.action }}</span>
              <span class="payload">{{ action.payload }}</span>
            </div>
          </template>
        </div>
      </ApolloQuery>
    </div>
    <div class="feed-options">
      <el-date-picker
        v-model="range"
        type="datetimerange"
        range-separator="To"
        start-placeholder="Start date"
        end-placeholder="End date"
      />
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'ActionLog',

  data: () => ({
    selectedCamera: 0,
    range: [
      moment().startOf('day'),
      moment().endOf('day'),
    ],
  }),

  computed: {
    variables() {
      return {
        dateFrom: this.range[0],
        dateTo: this.range[1],
      };
    }
  },

  methods: {
    shouldShowCamera(number) {
      return !this.selectedCamera || this.selectedCamera === number;
    },
    selectCamera(number) {
      this.selectedCamera = number;
    },
    getActionClass(action) {
      return action.includes('_ERROR') ? 'error' : 'success';
    },
    formatDate(timestamp) {
      return new Date(+timestamp).toLocaleString();
    },
    onActionLogAdded(previousResult, { subscriptionData }) {
      console.log('adfasdasd');

      return {
        logActions: [
          ...previousResult.logActions,
          subscriptionData.data.logActionAdded,
        ],
      };
    },
  },
};
</script>

<style scoped lang="stylus">
  .action-log
    display grid
    grid-template-columns max-content auto
    grid-gap 10px
    min-height 400px

    .video-feed
      display grid
      grid-template-columns 200px 200px
      grid-gap 20px
      grid-template-rows min-content min-content
      justify-content left

      &.single-video
        grid-template-columns 420px
        grid-template-rows min-content

      .camera
        background black
        color red
        display grid
        align-items end
        text-align end
        font-size 12px
        grid-template-rows min-content
        cursor pointer
        position relative

        &:hover
          outline 2px solid red

        .camera-hide
          position absolute
          top 10px
          right 10px
          z-index 999

        .title
          position absolute
          bottom 5px
          right 5px

          &::before
            content '🔴'
            font-size 8px
            padding-right 3px
            top 3px
            position absolute
            left -14px

    .action-feed
      background #fff
      overflow-y scroll
      border 1px solid #ccc

      .action-item
        text-align start
        font-size 12px
        line-height 14px
        font-family monospace
        display grid
        grid-template-columns max-content max-content max-content max-content max-content
        grid-gap 10px

        .createdAt
          color #aaa

        .action
          color green

          &.error
            color darkred

        .payload
          color darkblue
</style>
