import React from 'react';
import { Container, SubDiv1, SubDiv2 } from '../../styles/footer.styled';

function MainFooter() {
  return (
    <Container>
      <SubDiv1>
        <div className="stay_loop">
          <h4 className="loop_text">Stay in the loop</h4>
          <p className="loop_desc">
            Join our mailing list to stay in the loop with our newest feature release, <br />
            NFT dopes, and tips and tricks for navigating vefi NFT.
          </p>
        </div>
        <div>
            <form action="" className="signup">
                <div>
                    <input type="email" name="" id="" placeholder='Your email address'/>
                </div>
                <div>
                    <button type="submit">Sign Up</button>
                </div>
            </form>
        </div>
      </SubDiv1>
      <SubDiv2>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde, eos. Perferendis maiores molestias itaque enim
        deleniti modi animi expedita rerum minima illo at suscipit, quidem velit! Nesciunt ducimus earum corrupti?
      </SubDiv2>
    </Container>
  );
}

export default MainFooter;
