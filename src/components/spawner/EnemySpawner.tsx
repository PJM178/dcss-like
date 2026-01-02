import { EntitySpawner } from "@/util/spawner";
import { Button } from "../ui/Buttons";
import { tile_info } from "@/assets/player/mappings";
import { NPC } from "@/gameState/npc";
import { useRef, useState } from "react";
import Modal from "../ui/Modal";

interface EnemySpawnerProps {
  enemySpawner: EntitySpawner;
}

const EnemySpawner = (props: EnemySpawnerProps) => {
  const { enemySpawner } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSpawnEntity = () => {
    const npc = new NPC(3, 3, tile_info[6], enemySpawner.getGridState());

    enemySpawner.spawnEntity(npc);
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
        onClose={() => setIsModalOpen(false)}
      >
        <div>
          <Button
            variant="wrapper"
            onClick={handleSpawnEntity}
          >
            Spawn entity - insert canvas element component here for selection of the entity to spawn the selected entity
            Basically the .png style sheet
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default EnemySpawner;