
    伸缩容器（display: flex、inline-flex）

        主轴对齐：justify-content
            flex-start
            center
            flex-end

            space-between   伸缩项目包裹剩余空间
            space-around    剩余空间包裹伸缩项目


        侧轴对齐：

            align-items: （行的侧轴）
                flex-start
                center
                flex-end

                baseline  一行中伸缩项目基线最大的作为整行对齐的基准。
                stretch   默认：拉伸，如果伸缩容器设置高度，与容器等高。

            align-content:
                 前提：必须要换行（flex-wrap: wrap/ wrap-reverse）

                 flex-start
                 center
                 flex-end

                 space-between   伸缩项目包裹剩余空间（容器的侧轴）
                 space-around    剩余空间包裹伸缩项目（容器的侧轴）


        主轴，侧轴方向控制

            flex-direction:

                row（默认值）

                row-reverse
                    --- 主轴 start 和 end 对调

                column
                    --- 主轴与侧轴对调

                column-reverse
                     ---  主轴与侧轴对调 ， 主轴 start 和 end 对调

        是否包裹伸缩项目

            flex-wrap:
                nowrap （默认值）

                wrap
                    --- 主轴空间不足，换行显示

                wrap-reverse
                    --- 主轴空间不足，换行显示, 侧轴 start 和 end 对调


        伸缩项目

            侧轴对齐：
                align-self

                 flex-start
                 center
                 flex-end

            分配伸缩容器的剩余空间

               flex-grow: number


            沿着主轴排列顺序
                order: number