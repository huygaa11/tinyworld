#include <stdio.h>


int main()
{
int fd1, fd2;

fd1 = Open("foo.txt", O_RDONLY, 0);

fd2 = Open("baz.txt", O_RDONLY, 0);
printf("fd1 = %d\n", fd1);

close(fd1);
exit(0);

}
