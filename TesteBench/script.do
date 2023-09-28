vlib work

vcom latch.vhd
vcom ff_d_subida.vhd
vcom elementosDeMemoria.vhd

vsim -voptargs=+acc=lprn -t ns work.testbench

add wave sim:/*

run 1 us