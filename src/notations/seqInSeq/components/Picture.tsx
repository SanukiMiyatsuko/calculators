import { ReactP5Wrapper, type P5CanvasInstance, type SketchProps } from "@p5-wrapper/react";
import type { Seq } from "../models/Definition";
import { seqToPair } from "../models/Transform";

type MySketchProps = SketchProps & {
  tree: Seq;
  headSize: number;
  headRange: number;
  headHeight: number;
  thickness: number;
};

export const Picture = ({
  inputx,
  inputy,
  output,
  headSize,
  headRange,
  headHeight,
  thickness,
}: {
  inputx: Seq | null;
  inputy: Seq | null;
  output: Seq | null;
  headSize: number;
  headRange: number;
  headHeight: number;
  thickness: number;
}) => {
  return (
    <>
      {inputx &&
        <span>
          A<br />
          <ReactP5Wrapper
            sketch={sketchInput}
            tree={inputx}
            headSize={headSize}
            headRange={headRange}
            headHeight={headHeight}
            thickness={thickness}
          />
        </span>
      }
      {inputy &&
        <span>
          B<br />
          <ReactP5Wrapper
            sketch={sketchInput}
            tree={inputy}
            headSize={headSize}
            headRange={headRange}
            headHeight={headHeight}
            thickness={thickness}
          />
        </span>
      }
      {output &&
        <span>
          出力<br />
          <ReactP5Wrapper
            sketch={sketchInput}
            tree={output}
            headSize={headSize}
            headRange={headRange}
            headHeight={headHeight}
            thickness={thickness}
          />
        </span>
      }
    </>
  );
};

const DEFAULT_FRAME_RATE = 20;
const FRAME_COLOR = 210;
const BACKGROUND_COLOR = 55;

const sketchInput = (p: P5CanvasInstance<MySketchProps>) => {
  let tree: Seq;
  let nodeSize = 60;
  let nodeRange = 0;
  let nodeHeight = 0;
  let thickness = 3;

  p.setup = () => {
    p.createCanvas(0, 0);
    p.textAlign(p.CENTER, p.CENTER);
    p.frameRate(DEFAULT_FRAME_RATE);
  };

  p.updateWithProps = (props: MySketchProps) => {
    ({
      tree: tree,
      headSize: nodeSize,
      headRange: nodeRange,
      headHeight: nodeHeight,
      thickness: thickness,
    } = props);
  };

  p.draw = () => {
    p.clear();
    const fromSeq = seqToPair(tree);

    const heightest = Math.max(0, ...fromSeq);
    const canvasWidth = (fromSeq.length + 2) * nodeSize + fromSeq.length * nodeRange;
    const canvasHeight = (heightest + 2) * nodeSize + heightest * nodeHeight;
    p.resizeCanvas(canvasWidth, canvasHeight);

    const getX = (x: number): number => nodeSize + x;
    const getY = (y: number): number => canvasHeight - nodeSize - y;

    p.stroke(FRAME_COLOR);
    p.strokeWeight(thickness);

    p.fill(BACKGROUND_COLOR);
    p.textSize(nodeSize / 1.5);

    const crossHalfSize = nodeSize / (2 * Math.sqrt(2));
    p.line(
      getX(- crossHalfSize),
      getY(- crossHalfSize),
      getX(crossHalfSize),
      getY(crossHalfSize),
    );
    p.line(
      getX(crossHalfSize),
      getY(- crossHalfSize),
      getX(- crossHalfSize),
      getY(crossHalfSize),
    );

    const hx = (x: number) => getX((nodeRange + nodeSize) * (x + 1));
    const hy = (y: number) => getY((nodeHeight + nodeSize) * y);

    fromSeq.forEach((x, i) => {
      let r = i;
      while (r >= 0 && fromSeq[r] >= x)
        r -= 1;
      p.line(hx(r), hy(x - 1), hx(i), hy(x));
      return;
    });

    fromSeq.forEach((x, i) => {
      const cx = hx(i);
      const cy = hy(x);
      p.circle(cx, cy, nodeSize);
      return;
    });
  };
};
