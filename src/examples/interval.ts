export default {
  example1: `
  <template>
    <div>
      <vue-slider
        v-model="value"
        :data="data"
        :marks="marks"
      ></vue-slider>
    </div>
  </template>
  <script>
    module.exports = {
      components: {
        VueSlider
      },
      data: function () {
        return {
          value: 0,
        }
      },
      computed: {
        points: function () {
          return [
            {
              value: 0,
              step: 1,
            },
            {
              value: 50,
              step: 5,
            },
            {
              value: 300,
              step: 10,
            },
            {
              value: 800,
              step: 50,
            },
          ];
        },
        data: function () {
          let result = [];

          this.points.forEach((point, idx) => {
            const lastPointValue = this.points[this.points.length - 1].value;

            if (point.value === lastPointValue) {
              return;
            } else {
              const nextPoint = this.points[idx + 1];

              for (let i = point.value; i <= nextPoint.value; i += point.step) {
                result.push(i);
              }
            }
          });

          const uniqueValues = new Set(result);
          return [...uniqueValues];
        },
        marks: function () {
          return this.points.map(point => point.value);
        },
      },
    }
  </script>
    `,
}
