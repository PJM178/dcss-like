import { EntitySpawner } from "@/util/spawner";
import { Button } from "../ui/Buttons";
import { Enemy } from "@/gameState/enemy";
import { tile_info } from "@/assets/player/mappings";
import { NPC } from "@/gameState/npc";

interface EnemySpawnerProps {
  enemySpawner: EntitySpawner;
}

const EnemySpawner = (props: EnemySpawnerProps) => {
  const { enemySpawner } = props;
  
  const handleSpawnEntity = () => {
    const npc = new NPC(3, 3, tile_info[6], enemySpawner.getGridState());

    enemySpawner.spawnEntity(npc);
  };

  return (
    <Button
      variant="wrapper"
      onClick={handleSpawnEntity}
    >
      Spawn entity
    </Button>
  );
};

export default EnemySpawner;