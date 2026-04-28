function About() {
    return (
        <div>
            <h2>About</h2>
            <div>
                This page contains information about the various encryption algorithms that can be used on this website.
            </div>
            <div>
                Remember that these algorithms aren't cryptographically secure and neither is communication with the server.
                In no way should this website be used to encrypt confidential information.
            </div>
            <div>
                Also, each algorithm has a list of valid characters. Any invalid characters will be replaced with "?".
            </div>

            <h2>Caesar Cipher</h2>
            <div>
                This algorithm is one of the oldest and most basic encryption algorithms.
                For a key it uses a random integer from 1 to 25
                Then it assigns a numerical value to each character.
                Finally, it adds the key to the character number (cycling back to 0 if the number goes above 26).
                Now the new text has been shifted by that many characters.
            </div>
            <div>
                The implementation that this website uses includes the letters a-z, numbers 0-9, as well as spaces, periods, and questions marks.
                Only the letters will are shifted, all other valid characters are left unchanged.
            </div>

            <h2>Hill Cipher</h2>
            <div>
                The hill cipher is a little more complicated than the caesar cipher.
                It uses linear algebra to encrypt and decrypt messages.
                Since it is more complicated, it is also a little more secure.
                However, the messages can still be deciphered without the key using various attacks.
            </div>
            <div>
                The algorithm begins by assigning numberical values to each characters.
                Then it puts these characters into groups of 3 with each group representing a vector.
                These vectors are then put into a 3xn matrix.
                The key is a 3x3 invertible matrix.
                To encrypt the message, the message matrix is multiplied on the left by the key.
                To decrypt, the cipher matrix is multiplied on the left by the inverse of the key.
                The actual algorithm is a little more complicated than this, but that is the main idea.
            </div>
            <div>
                This implementation of the algorithm has valid characters a-z, spaces, periods, and question marks.
                Each of these characters are used in the algorithm, so the whole message is encrypted.
            </div>
        </div>
    );
}

export default About;