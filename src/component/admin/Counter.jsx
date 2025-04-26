// components
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";

// hooks
import { useState } from "react";

const Counter = ({ num, className, isFormatted, ...props }) => {
  const [countFinished, setCountFinished] = useState(false);

  return (
    <CountUp
      start={countFinished ? num : 0}
      end={num}
      duration={2}
      onEnd={() => setCountFinished(true)}
      {...props}
    >
      {({ countUpRef, start }) => (
        <VisibilitySensor onChange={start} active={!countFinished} delayedCall>
          <div
            className={`flex items-center justify-center ${className || ""}`}
          >
            <span className="opacity-0 absolute">
              {props.prefix}
              {num}
              {props.suffix}
            </span>
            <span className="inline-block" ref={countUpRef} />
          </div>
        </VisibilitySensor>
      )}
    </CountUp>
  );
};

export default Counter;
