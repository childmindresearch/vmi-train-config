
const Explanations = () => {
    return (
    <div className='div-explanation'>
          <ul>  
            <li>
              <b>Room Name</b>: The name of the room. This is used to identify the
              room in the experiment but is otherwise not used.

            </li>
            <li>
              <b>Seed</b>: The seed for the random number generator. Used to place 
              distractors.
            </li>
            <li>
              <b>Width</b>: The width of the room (arbitrary units).
            </li>
            <li>
              <b>Height</b>: The height of the room (arbitrary units).
            </li>
            <li>
              <b>Duration</b>: The duration of the room (seconds).
            </li>
            <li>
              <b>Number of Distractors</b>: The number of distractors to place in 
              the room.
            </li>
            <li>
              <b>Instructions</b>: The instructions to provide on the starting screen of the room.
              </li>
            <li>
              <b>Train Path</b>: The path that the train will take throughout the 
              room. The tracks will start at the first point and end at the last 
              point. The train will travel along the path in the order that the 
              points are listed. For X/Y 0 is left/bottom and 1 is right/top.
            </li>
            <li>
              <b>Time-Position</b>: The time at which the train will be at the 
              corresponding point in the train path. Both time and position must 
              be in range [0, 1] where 0 is the start of the duration/track and 
              1 the end.
            </li>
            <li>
              <b>Occlusions</b>: The locations of the tunnels. Occlusions come 
              with a start and stop, both of which should be in range [0, 1] 
              where 0 is the start of the track and 1 the end.
            </li>
            <li>
              <b>Collisions</b>: The locations of the collisions. Collisions 
              should be in range [0, 1] where 0 is the start of the track and 
              1 the end.
            </li>
            <li>
              <b>Time-Position Interpolation</b>: Whether use a Lagrange 
              interpolatation between the points of time-position. If true,
              acceleration and deceleration will be smooth rather than instantaneous.
            </li>
          </ul>
      </div>
    )
}

export default Explanations