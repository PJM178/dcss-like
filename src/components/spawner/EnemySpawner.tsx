import { EntitySpawner } from "@/util/spawner";
import { Button } from "../ui/Buttons";
import { tile_info } from "@/assets/player/mappings";
import { NPC } from "@/gameState/npc";
import { useMemo, useRef, useState } from "react";
import Modal from "../ui/Modal";
import { getAsset } from "@/assets/imageLoader";
import styles from "./EnemySpawner.module.css";

interface EnemySpawnerProps {
  enemySpawner: EntitySpawner;
}

const EnemySpawner = (props: EnemySpawnerProps) => {
  const { enemySpawner } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredTileIndex, setHoveredTileIndex] = useState<number | null>(null);
  const [selectedTileIndex, setSelectedTileIndex] = useState<number | null>(null);
  const cornerLength = 12; // how far each corner line goes
  const lineWidth = 2;
  const strokeStyle = "#2CFF05";
  const tilesPerRow = 8;
  const maxTileDimension = useMemo(() => {
    return tile_info.reduce(
      (max, item) => (item.h || item.w) > max ? item.h > item.w ? item.h : item.w : max,
      -Infinity
    )
  }, []);
  const canvasHeight = maxTileDimension * Math.ceil(tile_info.length / tilesPerRow) + lineWidth;
  const canvasWidth = maxTileDimension * tilesPerRow + lineWidth;

  const handleSpawnEntity = () => {
    const npc = new NPC(3, 3, tile_info[selectedTileIndex || 0], enemySpawner.getGridState());

    enemySpawner.spawnEntity(npc);
  };


  const handlePointerMove = (ev: React.PointerEvent<HTMLCanvasElement>) => {
    if (ev.pointerType !== "mouse") return;

    const canvas = canvasRef.current;

    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const offset = lineWidth; // same offset used in drawing

    const x = ev.clientX - rect.left - offset; // mouse x in canvas coordinates
    const y = ev.clientY - rect.top - offset;  // mouse y in canvas coordinates

    const col = Math.floor(x / maxTileDimension);
    const row = Math.floor(y / maxTileDimension);
    const colClamped = Math.min(Math.max(0, col), tilesPerRow - 1); // for 6 tiles per row
    const rowClamped = Math.min(Math.max(0, row), Math.floor(tile_info.length / tilesPerRow));
    const index = rowClamped * tilesPerRow + colClamped;

    if (index >= 0 && index < tile_info.length) {
      setHoveredTileIndex(index);
    } else {
      setHoveredTileIndex(null);
    }
  };

  const handlePointerUp = (ev: React.PointerEvent<HTMLCanvasElement>) => {
    if (ev.pointerType !== "touch") return;

    const canvas = canvasRef.current;

    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const offset = lineWidth; // same offset used in drawing

    const x = ev.clientX - rect.left - offset; // mouse x in canvas coordinates
    const y = ev.clientY - rect.top - offset;  // mouse y in canvas coordinates

    const col = Math.floor(x / maxTileDimension);
    const row = Math.floor(y / maxTileDimension);
    const colClamped = Math.min(Math.max(0, col), tilesPerRow - 1); // for 6 tiles per row
    const rowClamped = Math.min(Math.max(0, row), Math.floor(tile_info.length / tilesPerRow));
    const index = rowClamped * tilesPerRow + colClamped;

    if (index >= 0 && index < tile_info.length) {
      setSelectedTileIndex(index);
    } else {
      setSelectedTileIndex(null);
    }
  }

  const handleMouseLeave = () => setHoveredTileIndex(null);

  const handleMouseClick = () => {
    setSelectedTileIndex(hoveredTileIndex || selectedTileIndex);
  };

  function drawCornerRect(ctx: CanvasRenderingContext2D, x: number, y: number, tileSize: number, cornerLength: number) {
    ctx.beginPath();

    // Top-left corner
    ctx.moveTo(x, y + cornerLength);       // vertical line down
    ctx.lineTo(x, y);                      // up to corner
    ctx.lineTo(x + cornerLength, y);       // horizontal line right

    // Top-right corner
    ctx.moveTo(x + tileSize - cornerLength, y);
    ctx.lineTo(x + tileSize, y);
    ctx.lineTo(x + tileSize, y + cornerLength);

    // Bottom-right corner
    ctx.moveTo(x + tileSize, y + tileSize - cornerLength);
    ctx.lineTo(x + tileSize, y + tileSize);
    ctx.lineTo(x + tileSize - cornerLength, y + tileSize);

    // Bottom-left corner
    ctx.moveTo(x + cornerLength, y + tileSize);
    ctx.lineTo(x, y + tileSize);
    ctx.lineTo(x, y + tileSize - cornerLength);

    ctx.stroke();
  }

  function onRender() {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    const player = getAsset("player");

    if (!ctx) return;

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    let currentRow = 0;
    let currentColumn = 0;
    const offset = lineWidth / 2;

    tile_info.forEach((tile, index) => {
      const { sx, sy, ex, ey, ox = 0, oy = 0 } = tile;
      const sourceW = ex - sx;
      const sourceH = ey - sy;

      const dx = offset + currentColumn * maxTileDimension + Math.floor((maxTileDimension - sourceW) / 2) + ox;
      const dy = offset + currentRow * maxTileDimension + Math.floor((maxTileDimension - sourceH) / 2) + oy;

      // Draw sprite at natural size
      ctx.drawImage(player, sx, sy, sourceW, sourceH, dx, dy, sourceW, sourceH);

      // Draw border if this tile is hovered
      if (index === hoveredTileIndex) {
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = lineWidth;

        drawCornerRect(ctx, offset + currentColumn * maxTileDimension, offset + currentRow * maxTileDimension, maxTileDimension, cornerLength);
      }

      // Draw a box around the tile to indicate that it's currently selected
      if (selectedTileIndex === index) {
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = lineWidth;

        ctx.strokeRect(
          currentColumn * maxTileDimension + offset,
          currentRow * maxTileDimension + offset,
          maxTileDimension,
          maxTileDimension,
        );
      }

      currentColumn += 1;

      if (currentColumn >= tilesPerRow) {
        currentColumn = 0;
        currentRow += 1;
      }
    });
  }

  const handleModalClose = () => {
    setIsModalOpen(false);
    setHoveredTileIndex(null);
    setSelectedTileIndex(null);
  };

  return (
    <>
      <Button
        variant="wrapper"
        onClick={() => setIsModalOpen(true)}
      >
        Select entity
      </Button>
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onRender={onRender}
      >
        <Button
          variant="primary"
          onClick={handleSpawnEntity}
        >
          Spawn selected entity
        </Button>
        <div
          className={styles["canvas--container"]}
        >
          <canvas
            height={canvasHeight}
            width={canvasWidth}
            ref={canvasRef}
            style={{ imageRendering: "pixelated" }}
            onPointerMove={handlePointerMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleMouseClick}
            onPointerUp={handlePointerUp}
          >
            Select entity
          </canvas>
        </div>
        <div>
          JORMA
        </div>
      </Modal>
    </>
  );
};

export default EnemySpawner;