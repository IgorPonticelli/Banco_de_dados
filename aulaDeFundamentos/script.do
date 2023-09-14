vlib work

vcom Meio_somador.vhd
vcom Somador.vhd
vcom Somador_completo.vhd

vsim -voptargs=+acc=lprn -t ns work_somador_3b

add wave -radix binary sim:/*

force -freeze sim:/somador_3b/op_a(0)1 0,0
set StdArithNoWarnings 1

set StdVitalGlitchNoWarnings 1

run 2 us