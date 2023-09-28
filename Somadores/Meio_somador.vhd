-- Igor Ponticelli

library ieee;
    use ieee.std_logic_1164.all;
entity halhAdder is
port
(
    a,b  :   in std_logic;
    s,co    :   out std_logic
);
end halhAdder;

architecture ha of halhAdder is

begin
    s   <= a xor b;
    co  <= a and b;

end ha;
