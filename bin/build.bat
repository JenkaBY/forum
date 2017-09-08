echo "Build java classes..."
cd ../src
dir /s /B *.java > ../bin/sources.txt
javac.exe -sourcepath ./src/ -cp ../WebContent/WEB-INF/lib/* -d ../WebContent/WEB-INF/classes/ @../bin/sources.txt
echo "Java classes were built."
pause "Press any key to continue..."


