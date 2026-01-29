#!/bin/bash

sbt assembly

spark-submit --class Main target/scala-2.13/spark-tui-backend-assembly-0.1.0.jar