-- Igor Haziel Ponticelli
-- igor.ponticelli@edu.purcs.br
-- Aula 28/setembro/Dois mil e 23

library ieee;
    use ieee.std_logic_1164.all;


entity testbench is

end testbench;

architecture tb of testbench is

    signal dado     :   std_logic := '0';
    signal habilita :   std_logic := '1';
    signal saida_latch: std_logic := '0';
    signal saida_latch_n: std_logic:= '0';
    signal saida_subida: std_logic := '0';
    signal saida_subida_n: std_logic := '0';
    signal saida_descida: std_logic := '0';
    signal saida_descida_n: std_logic := '0';



begin

    habilita <= not habilita after 10 ns;

    dado <= '0',
            '1' after 123 ns,
            '0' after 264 ns,
            '1' after 621 ns,
            '0' after 841 ns,
            '1' after 943 ns;

    -- instaciacoes dos circuitos que desejamos verfificar
    exemplo_lanch: entity work.latch_d
    port map
    (
        d   =>      dado, 
        en  =>      habilita,
        q   =>      saida_latch,
        qn  =>      saida_latch_n

    );

    subida: entity work.ff_d_s
    port map
    (
        d   =>   dado,
        clk =>   habilita,
        q   =>   saida_subida,
        qn  =>   saida_subida_n


    );

    subida2: entity work.ff_d_s
    port map
    (
        d   =>   saida_subida
        clk =>   habilita,
        q   =>   saida_subida,
        qn  =>   saida_subida_n


    );

    ff_descida: entity work.ff_d_d
    port map
    (
        d   =>   dado,
        clk =>   habilita,
        q   =>   saida_descida,
        qn  =>   saida_descida_n


    );

            
end tb;