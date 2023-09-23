import React from "react";
import Card from "@mui/joy/Card";
import Skeleton from "@mui/joy/Skeleton";
import AspectRatio from "@mui/joy/AspectRatio";
import _ from "lodash";
import styles from "./TaskListSkeleton.module.scss";

const TaskListSkeleton = ({ count }) =>
  _.range(count).map(() => (
    <Card
      className={styles.taskListSkeleton}
      variant="outlined"
      sx={{ display: "flex", gap: 2 }}
    >
      <AspectRatio ratio="21/3">
        <Skeleton variant="overlay">
          <img
            alt=""
            src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
          />
        </Skeleton>
      </AspectRatio>
    </Card>
  ));

export default TaskListSkeleton;
